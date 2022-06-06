/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Content from "../../../components/Content";
import { useState } from "react";
import Swal from "sweetalert2";
import { update, getOne } from "../../../services/basis-pengetahuan";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getForSelect as getForSelectHamaPenyakit } from "../../../services/hama-penyakit";
import { getForSelect as getForSelectGejala } from "../../../services/gejala";
import jwtDecode from "jwt-decode";

const Ubah = ({ oneData, params, dataHamaPenyakit, dataGejala }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    hamaPenyakit: "",
    gejala: "",
    cfPakar: 0,
  });

  useEffect(() => {
    if (Object.keys(oneData).length > 0) {
      setForm({
        ...form,
        hamaPenyakit: oneData?.hamaPenyakit?._id || "",
        gejala: oneData?.gejala?._id || "",
        cfPakar: oneData?.cfPakar || 0,
      });
    }
  }, []);

  const handleUbah = async () => {
    const response = await update(params?.id, form);
    if (response?.data?.statusCode === 200) {
      router.push("/basis-pengetahuan");
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
    <Content title="Ubah Basis Pengetahuan">
      <div className="max-w-2xl mx-auto">
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="hamaPenyakit"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Hama/Penyakit
          </label>
          <select
            name="hamaPenyakit"
            className="select select-bordered w-full"
            onChange={(event) =>
              setForm({ ...form, hamaPenyakit: event.target.value })
            }
          >
            <option value=""></option>
            {dataHamaPenyakit.length > 0 &&
              dataHamaPenyakit.map((value, index) =>
                value?._id === oneData?.hamaPenyakit?._id ? (
                  <option key={index} value={value?._id} selected>
                    {value?.nama}
                  </option>
                ) : (
                  <option key={index} value={value?._id}>
                    {value?.nama}
                  </option>
                )
              )}
          </select>
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
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="cfPakar"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            CF Pakar
          </label>
          <input
            type="number"
            min={0}
            className="input input-bordered w-full"
            name="cfPakar"
            onChange={(event) =>
              setForm({ ...form, cfPakar: event.target.value })
            }
            value={form.cfPakar}
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
  const responseHamaPenyakit = await getForSelectHamaPenyakit(token);
  const responseGejala = await getForSelectGejala(token);

  return {
    props: {
      oneData: responseOneData?.data?.data || {},
      dataHamaPenyakit: responseHamaPenyakit?.data?.data || [],
      dataGejala: responseGejala?.data?.data || [],
      params,
    },
  };
}
