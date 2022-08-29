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
import Link from "next/link";
import { MultiSelect } from "react-multi-select-component";

const Ubah = ({ oneData, params, dataHamaPenyakit, dataGejala }) => {
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

  useEffect(() => {
    if (Object.keys(oneData).length > 0) {
      let _tempIdGejala = [];

      let _idGejala = [];
      oneData.gejala.forEach((_idGej) => {
        _idGejala.push(_idGej?._id);
      });

      if (_idGejala.length > 0) {
        let updateForShowValueGejala = [];
        optionsGejala.forEach((element) => {
          _idGejala.forEach((result) => {
            if (element?.value === result) {
              updateForShowValueGejala.push({
                label: element?.label,
                value: element?.value,
              });
            }
          });
        });

        if (updateForShowValueGejala.length > 0) {
          setShowValueGejala(updateForShowValueGejala);
          updateForShowValueGejala.forEach((idGej) => {
            _tempIdGejala.push(idGej?.value);
          });
        }
      }

      setForm({
        ...form,
        hamaPenyakit: oneData?.hamaPenyakit || "",
        gejala: _tempIdGejala,
      });
    }
  }, []);

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

  const handleUbah = async () => {
    const response = await update(params?.id, form);
    if (response?.data?.statusCode === 200) {
      router.replace("/basis-pengetahuan");
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
