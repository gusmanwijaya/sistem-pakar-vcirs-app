/* eslint-disable @next/next/no-img-element */
import Content from "../components/Content";
import Pagination from "../components/Pagination";
import jwtDecode from "jwt-decode";
import { getAll } from "../services/dashboard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHamaPenyakit } from "../redux/hama-penyakit/actions";
import { useEffect } from "react";
import Link from "next/link";
import { fetchAllDiagnosa, setPage } from "../redux/diagnosa/actions";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { destroy } from "../services/diagnosa";

const Dashboard = ({ data, users }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const API_IMAGE = process.env.NEXT_PUBLIC_API_IMAGE;
  const directory = "hama-penyakit";

  const { allData } = useSelector((state) => state.hamaPenyakitReducers);
  const {
    allData: allDataHistory,
    page,
    total_page,
  } = useSelector((state) => state.diagnosaReducers);

  const handlePrevious = () => {
    dispatch(setPage(page <= 1 ? 1 : page - 1));
  };

  const handleNext = () => {
    dispatch(setPage(page === total_page ? total_page : page + 1));
  };

  useEffect(() => {
    dispatch(fetchAllHamaPenyakit());
    dispatch(fetchAllDiagnosa(users?.role === "pengguna" ? users?._id : ""));
  }, [dispatch, page, users?._id, users?.role]);

  const onDelete = (id) => {
    Swal.fire({
      title: "Hapus data?",
      text: "Data yang telah dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9f1239",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await destroy(id);
        if (response?.data?.statusCode === 200) {
          Swal.fire({
            icon: "success",
            title: "Sukses",
            text: `${response?.data?.message || "Berhasil menghapus data!"}`,
          });
          dispatch(
            fetchAllDiagnosa(users?.role === "pengguna" ? users?._id : "")
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${
              response?.data?.message || "Nampaknya terjadi kesalahan!"
            }`,
          });
        }
      }
    });
  };

  return (
    <Content title="Dashboard">
      <div className="alert shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>
            SISTEM PAKAR UNTUK MENGIDENTIFIKASI HAMA DAN PENYAKIT PADA TANAMAN
            KOPI ROBUSTA MENGGUNAKAN METODE VARIABLE-CENTERED INTELLIGENT RULE
            SYSTEM (VCIRS) BERBASIS WEB.
          </span>
        </div>
      </div>
      <div className="h-full overflow-y-auto mt-8">
        <div className="container mx-auto grid">
          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            {users?.role === "admin" && (
              <>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Hama/Penyakit
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {data?.hamaPenyakit || 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-cyan-500 bg-cyan-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Gejala
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {data?.gejala || 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                  <div className="p-3 mr-4 text-sky-500 bg-sky-100 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600">
                      Solusi
                    </p>
                    <p className="text-lg font-semibold text-gray-700">
                      {data?.solusi || 0}
                    </p>
                  </div>
                </div>
              </>
            )}
            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
              <div className="p-3 mr-4 text-violet-500 bg-violet-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600">
                  Pertanyaan
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  {data?.pertanyaan || 0}
                </p>
              </div>
            </div>
            {users?.role === "admin" && (
              <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                <div className="p-3 mr-4 text-amber-500 bg-amber-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    Basis Pengetahuan
                  </p>
                  <p className="text-lg font-semibold text-gray-700">
                    {data?.basisPengetahuan || 0}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
              <div className="p-3 mr-4 text-fuchsia-500 bg-fuchsia-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                  />
                </svg>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600">
                  Hasil Diagnosa
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  {data?.hasilDiagnosa || 0}
                </p>
              </div>
            </div>
            {users?.role === "admin" && (
              <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
                <div className="p-3 mr-4 text-lime-500 bg-lime-100 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    Pengguna
                  </p>
                  <p className="text-lg font-semibold text-gray-700">
                    {data?.pengguna || 0}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className={"font-semibold text-lg text-gray-600"}>
                History Diagnosa
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Tanggal
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Nama
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Persentase
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Hasil
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {allDataHistory.length > 0 &&
                allDataHistory.map((value, index) => (
                  <tr key={index}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {value?.tanggal}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {value?.user?.name}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {value?.percentage}
                    </td>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <img
                        src={`${API_IMAGE}/${directory}/${value?.hamaPenyakit?.foto}`}
                        className="h-12 w-12 bg-white rounded-full border"
                        alt="..."
                      ></img>{" "}
                      <span className={"ml-3 font-bold text-blueGray-600"}>
                        {value?.hamaPenyakit?.nama}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center space-x-1">
                      <button
                        className="btn btn-ghost btn-xs capitalize"
                        onClick={() =>
                          router.push(`/history-diagnosa/detail/${value?._id}`)
                        }
                      >
                        Detail
                      </button>
                      {users?.role === "admin" && (
                        <button
                          className="btn btn-ghost btn-xs capitalize text-red-500"
                          onClick={() => onDelete(value?._id)}
                        >
                          Hapus
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row justify-end px-4 py-4">
          <Pagination
            page={page}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            disabledPrevious={page <= 1 ? true : false}
            disabledNext={page === total_page ? true : false}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg px-8 py-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h2 className="text-2xl font-extrabold text-gray-600">
            Informasi Hama/Penyakit
          </h2>

          <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
            {allData.length > 0 &&
              allData.map((value, index) => (
                <Link key={index} href={`/informasi/${value?._id}`}>
                  <div className="cursor-pointer group relative mb-6 lg:mb-0">
                    <div className="relative w-full h-full rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                      {value?.foto ? (
                        <img
                          src={`${API_IMAGE}/${directory}/${value?.foto}`}
                          alt={value?.nama}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={`/img/empty.svg`}
                          alt="Empty"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <p className="text-base text-center font-semibold text-slate-400 mt-4">
                      {value?.nama}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </Content>
  );
};

export default Dashboard;

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  if (!token)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const users = jwtDecode(token);

  const response = await getAll(
    token,
    users?.role === "admin" ? "" : users?._id
  );

  return {
    props: {
      data: response?.data?.data || {},
      users,
    },
  };
}
