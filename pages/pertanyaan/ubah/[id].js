/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Content from "../../../components/Content";
import { useState } from "react";
import Swal from "sweetalert2";
import { update, getOne } from "../../../services/pertanyaan";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getForSelect } from "../../../services/gejala";
import jwtDecode from "jwt-decode";

const Ubah = ({ oneData, params, dataGejala }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    pertanyaan: "",
    gejala: "",
  });

  useEffect(() => {
    if (Object.keys(oneData).length > 0) {
      setForm({
        ...form,
        pertanyaan: oneData?.pertanyaan || "",
        gejala: oneData?.gejala?._id || "",
      });
    }
  }, []);

  const handleUbah = async () => {
    const response = await update(params?.id, form);
    if (response?.data?.statusCode === 200) {
      router.push("/pertanyaan");
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
    <Content title="Ubah Pertanyaan">
      <div className="max-w-2xl mx-auto">
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="deskripsi"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Pertanyaan
          </label>
          <input
            type="text"
            name="pertanyaan"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, pertanyaan: event.target.value })
            }
            value={form?.pertanyaan}
          />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="gejala"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Gejala
          </label>
          <select
            name="gejala"
            className="select select-bordered w-full"
            onChange={(event) =>
              setForm({ ...form, gejala: event.target.value })
            }
          >
            <option value=""></option>
            {dataGejala.length > 0 &&
              dataGejala.map((value, index) =>
                value?._id === oneData?.gejala?._id ? (
                  <option key={index} value={value?._id} selected>
                    {value?.deskripsi}
                  </option>
                ) : (
                  <option key={index} value={value?._id}>
                    {value?.deskripsi}
                  </option>
                )
              )}
          </select>
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
  const responseGejala = await getForSelect(token);

  return {
    props: {
      oneData: responseOneData?.data?.data || {},
      dataGejala: responseGejala?.data?.data || [],
      params,
    },
  };
}
