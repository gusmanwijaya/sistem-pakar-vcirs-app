/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Content from "../../../components/Content";
import { useState } from "react";
import Swal from "sweetalert2";
import { update, getOne } from "../../../services/solusi";
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";

const Ubah = ({ oneData, params }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    deskripsi: "",
  });

  useEffect(() => {
    if (Object.keys(oneData).length > 0) {
      setForm({
        ...form,
        deskripsi: oneData?.deskripsi || "",
      });
    }
  }, []);

  const handleUbah = async () => {
    const response = await update(params?.id, form);
    if (response?.data?.statusCode === 200) {
      router.push("/solusi");
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: `${response?.data?.message || "Berhasil mengubah data!"}`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${response?.data?.message || "Nampaknya terjadi kesalahan!"}`,
      });
    }
  };

  return (
    <Content title="Ubah Solusi">
      <div className="max-w-2xl mx-auto">
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="deskripsi"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Solusi
          </label>
          <input
            type="text"
            name="deskripsi"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, deskripsi: event.target.value })
            }
            value={form?.deskripsi}
          />
        </div>
        <button
          type="button"
          onClick={handleUbah}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Ubah
        </button>
      </div>
    </Content>
  );
};

export default Ubah;

export async function getServerSideProps({ req, params }) {
  const { token } = req.cookies;
  if (!token)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const user = jwtDecode(token);
  if (user?.role !== "admin") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const responseOneData = await getOne(params?.id, token);

  return {
    props: {
      oneData: responseOneData?.data?.data || {},
      params,
    },
  };
}
