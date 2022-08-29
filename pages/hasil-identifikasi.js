/* eslint-disable @next/next/no-img-element */
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Content from "../components/Content";

const HasilIdentifikasi = () => {
  const router = useRouter();
  const [payload, setPayload] = useState({
    _id: "",
    user: "",
    tanggal: "",
    gejalaYangDipilih: [],
    basisPengetahuan: [],
    rule: [],
    hasilIdentifikasiHamaPenyakit: {},
  });
  const [toggleHasilPerhitungan, setToggleHasilPerhitungan] = useState(false);
  const API_IMAGE = process.env.NEXT_PUBLIC_API_IMAGE;
  const directory = "hama-penyakit";

  useEffect(() => {
    if (payload?._id === "") {
      const dataLocal = JSON.parse(localStorage.getItem("process"));
      setPayload({
        ...payload,
        _id: dataLocal?._id,
        user: dataLocal?.user,
        tanggal: dataLocal?.tanggal,
        gejalaYangDipilih: dataLocal?.gejalaYangDipilih,
        basisPengetahuan: dataLocal?.basisPengetahuan,
        rule: dataLocal?.rule,
        hasilIdentifikasiHamaPenyakit: dataLocal?.hasilIdentifikasiHamaPenyakit,
      });
    }
  }, [payload]);

  return (
    <Content title="Hasil Identifikasi">
      <div
        className="p-4 mb-8 border border-blue-300 rounded-lg bg-blue-50"
        role="alert"
      >
        <div className="flex items-center">
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-2 text-blue-900"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium text-blue-900">
            Hasil identifikasi dengan metode VCIRS
          </h3>
        </div>
        <div className="mt-2 mb-4 text-sm text-blue-900">
          Menurut hasil analisa, Anda terserang :{" "}
          <span className="font-bold uppercase">
            {payload?.hasilIdentifikasiHamaPenyakit?.nama}
          </span>{" "}
          <br />
          Dengan nilai analisa sebesar :{" "}
          <span className="font-bold uppercase">
            {payload?.rule?.length > 0 &&
              payload?.rule[payload?.rule?.length - 1]?.persenCFKombinasi}
          </span>
        </div>
        <div className="mt-2 mb-4 text-sm text-blue-900">
          {payload?.hasilIdentifikasiHamaPenyakit?.foto && (
            <div>
              Berikut gambar dari penyakit{" "}
              {payload?.hasilIdentifikasiHamaPenyakit?.nama}{" "}
              <img
                src={`${API_IMAGE}/${directory}/${payload?.hasilIdentifikasiHamaPenyakit?.foto}`}
                alt="Detail Penyakit"
                className="object-cover my-3 rounded-xl w-44 h-w-44"
              />
            </div>
          )}
          {payload?.hasilIdentifikasiHamaPenyakit?.solusi?.length > 0 && (
            <div>
              Solusinya adalah sebagai berikut : <br /> <br />
              {payload?.hasilIdentifikasiHamaPenyakit?.solusi?.map(
                (value, index) => (
                  <div key={index}>
                    <span className="font-bold uppercase">
                      {index + 1}. {value?.deskripsi}
                      <br />
                      <br />
                    </span>
                  </div>
                )
              )}
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex flex-row items-center space-x-1">
            <button
              onClick={() => setToggleHasilPerhitungan(!toggleHasilPerhitungan)}
              type="button"
              className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                className="-ml-0.5 mr-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Hasil perhitungan
            </button>
            <button
              onClick={() => router.replace("/dashboard")}
              type="button"
              className="btn btn-xs capitalize bg-transparent border-0 text-blue-900 hover:bg-transparent"
            >
              Kembali
            </button>
          </div>
          <p className="text-sm italic text-blue-900">{payload?.tanggal}</p>
        </div>
      </div>

      <div
        className={
          !toggleHasilPerhitungan
            ? "hidden transform transition-all ease-in duration-500"
            : "block transform transition-all ease-in duration-500"
        }
      >
        {payload?.rule?.length > 0 && (
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-8">
            <table className="w-full text-sm text-left text-gray-500">
              <caption className="p-5 text-base font-semibold text-center text-slate-900 bg-white">
                Hasil Perhitungan
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    No
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Hama/Penyakit
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Gejala
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Num Of Node
                  </th>
                  <th scope="col" className="py-3 px-6">
                    CF Pakar
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Variable Order
                  </th>
                  <th scope="col" className="py-3 px-6">
                    VUR
                  </th>
                  <th scope="col" className="py-3 px-6">
                    NUR
                  </th>
                  <th scope="col" className="py-3 px-6">
                    RUR
                  </th>
                  <th scope="col" className="py-3 px-6">
                    CFR
                  </th>
                  <th scope="col" className="py-3 px-6">
                    CF Kombinasi
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Hasil (%)
                  </th>
                </tr>
              </thead>
              <tbody>
                {payload?.rule?.map((value, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {value?.hamaPenyakit}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                      {value?.data?.length > 0 &&
                        value?.data?.map((valData, indexValData) => (
                          <p key={indexValData} className="border-b">
                            {valData?.gejala}
                          </p>
                        ))}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 max-w-sm">
                      {value?.data?.length > 0 &&
                        value?.data?.map((valData, indexValData) => (
                          <p key={indexValData} className="border-b">
                            {valData?.numOfNode}
                          </p>
                        ))}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 max-w-sm">
                      {value?.data?.length > 0 &&
                        value?.data?.map((valData, indexValData) => (
                          <p key={indexValData} className="border-b">
                            {valData?.cfPakar}
                          </p>
                        ))}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 max-w-sm">
                      {value?.data?.length > 0 &&
                        value?.data?.map((valData, indexValData) => (
                          <p key={indexValData} className="border-b">
                            {valData?.variableOrder}
                          </p>
                        ))}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 max-w-sm">
                      {value?.data?.length > 0 &&
                        value?.data?.map((valData, indexValData) => (
                          <p key={indexValData} className="border-b">
                            {valData?.VUR}
                          </p>
                        ))}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 max-w-sm">
                      {value?.NUR}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 max-w-sm">
                      {value?.RUR}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 max-w-sm">
                      {value?.CFR?.length > 0 &&
                        value?.CFR?.map((valData, indexValData) => (
                          <p key={indexValData} className="border-b">
                            {valData}
                          </p>
                        ))}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 max-w-sm">
                      {value?.CFKombinasi?.length > 0 &&
                        value?.CFKombinasi?.map((valData, indexValData) => (
                          <p key={indexValData} className="border-b">
                            {valData}
                          </p>
                        ))}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 max-w-sm">
                      {value?.persenCFKombinasi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {payload?.gejalaYangDipilih?.length > 0 && (
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-8">
            <table className="w-full text-sm text-left text-gray-500">
              <caption className="p-5 text-base font-semibold text-center text-slate-900 bg-white">
                Gejala Yang Dipilih
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    No
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Kode
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Gejala
                  </th>
                  <th scope="col" className="py-3 px-6">
                    CF Pakar
                  </th>
                </tr>
              </thead>
              <tbody>
                {payload?.gejalaYangDipilih?.map((value, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="py-4 px-6 font-medium text-gray-900 max-w-sm">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 max-w-sm">
                      {value?.kode}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                      {value?.deskripsi}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 max-w-sm">
                      {value?.cfPakar}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {payload?.basisPengetahuan?.length > 0 && (
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-8">
            <table className="w-full text-sm text-left text-gray-500">
              <caption className="p-5 text-base font-semibold text-center text-slate-900 bg-white">
                Basis Pengetahuan
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    No
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Penyakit
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Gejala
                  </th>
                  <th scope="col" className="py-3 px-6">
                    CF Pakar
                  </th>
                </tr>
              </thead>
              <tbody>
                {payload?.basisPengetahuan?.map((value, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 max-w-sm">
                      {value?.hamaPenyakit?.nama}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                      {value?.gejala?.length > 0 &&
                        value?.gejala?.map((valGejala, indexValGejala) => (
                          <p key={indexValGejala} className="border-b">
                            {valGejala?.deskripsi}
                          </p>
                        ))}
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900 max-w-sm">
                      {value?.gejala?.length > 0 &&
                        value?.gejala?.map((valGejala, indexValGejala) => (
                          <p key={indexValGejala} className="border-b">
                            {valGejala?.cfPakar}
                          </p>
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Content>
  );
};

export default HasilIdentifikasi;

export async function getServerSideProps({ req }) {
  const { token, process } = req.cookies;
  if (!token)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  if (!process)
    return {
      redirect: {
        destination: "/identifikasi",
        permanent: false,
      },
    };

  const users = jwtDecode(token);
  if (users?.role !== "admin" && users?.role !== "pengguna")
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };

  return {
    props: {},
  };
}
