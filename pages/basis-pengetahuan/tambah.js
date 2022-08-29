/* eslint-disable @next/next/no-img-element */
import Content from "../../components/Content";
import { useState } from "react";
import Swal from "sweetalert2";
import { create } from "../../services/basis-pengetahuan";
import { getForSelect as getForSelectHamaPenyakit } from "../../services/hama-penyakit";
import { getForSelect as getForSelectGejala } from "../../services/gejala";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import Link from "next/link";
import { MultiSelect } from "react-multi-select-component";

const Tambah = ({ dataHamaPenyakit, dataGejala }) => {
  const router = useRouter();

  let _tempForOptionsGejala = [];
  dataGejala.forEach((element) => {
    _tempForOptionsGejala.push({
      label: `${element?.deskripsi}`,
      value: element?._id,
    });
  });
  const optionsGejala = _tempForOptionsGejala;

  const [form, setForm] = useState({
    hamaPenyakit: "",
    gejala: [],
  });

  const [showValueGejala, setShowValueGejala] = useState([]);

  const handleMultipleSelectGejala = (data) => {
    setShowValueGejala(data);
    let _tempGejala = [];
    data.map((value, index) => {
      _tempGejala.push(value?.value);
      if (_tempGejala.length > 0) {
        setForm({ ...form, gejala: JSON.stringify(_tempGejala) });
      }
    });
  };

  const handleTambah = async () => {
    const response = await create(form);
    if (response?.data?.statusCode === 201) {
      router.replace("/basis-pengetahuan");
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: `${response?.data?.message || "Berhasil menambahkan data!"}`,
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
    <Content title="Tambah Basis Pengetahuan">
      <div className="max-w-2xl mx-auto">
        <Link href="/basis-pengetahuan">
          <button
            type="button"
            className="mb-6 max-w-2xl text-sm text-gray-500 flex flex-row items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>{" "}
            Kembali
          </button>
        </Link>
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
              dataHamaPenyakit.map((value, index) => (
                <option key={index} value={value?._id}>
                  {value?.nama}
                </option>
              ))}
          </select>
        </div>
        <div className="relative mb-6 w-full group">
          <label
            htmlFor="gejala"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Gejala
          </label>
          <MultiSelect
            options={optionsGejala}
            value={showValueGejala}
            onChange={(event) => handleMultipleSelectGejala(event)}
            labelledBy="Pilih gejala"
          />
        </div>
        <button
          type="button"
          onClick={handleTambah}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Tambah
        </button>
      </div>
    </Content>
  );
};

export default Tambah;

export async function getServerSideProps({ req }) {
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

  const responseHamaPenyakit = await getForSelectHamaPenyakit(token);
  const responseGejala = await getForSelectGejala(token);

  return {
    props: {
      dataHamaPenyakit: responseHamaPenyakit?.data?.data || [],
      dataGejala: responseGejala?.data?.data || [],
    },
  };
}
