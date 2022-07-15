/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Content from "../components/Content";
import { fetchAllPertanyaan, setPage } from "../redux/pertanyaan/actions";
import { createIdentifikasi } from "../redux/identifikasi/actions";
import { create } from "../services/identifikasi";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import moment from "moment";

const Identifikasi = ({ user }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const API_IMAGE = process.env.NEXT_PUBLIC_API_IMAGE;
  const directory = "gejala";

  const { allData, page, total_page } = useSelector(
    (state) => state.pertanyaanReducers
  );
  const { error } = useSelector((state) => state.identifikasiReducers);

  const [radio, setRadio] = useState({
    index: 0,
    data: [],
  });
  const [form, setForm] = useState({
    user: user?._id,
    tanggal: `${moment().get("date")}-${
      moment().get("month") + 1
    }-${moment().get("year")}`,
    hamaPenyakit: "",
    arrayCfUser: "",
  });

  // const handlePrevious = () => {
  //   dispatch(setPage(page <= 1 ? 1 : page - 1));
  //   setRadio("");
  // };

  // const handleNext = () => {
  //   dispatch(setPage(page === total_page ? total_page : page + 1));
  //   if (page !== total_page) {
  //     setRadio("");
  //   }
  // };

  const handleRadio = (value, index) => {
    if (!value && !index) {
      setRadio({
        ...radio,
        index: 0,
        data: [],
      });
    } else {
      setRadio({
        ...radio,
        index,
        data: [...radio.data, parseFloat(value)],
      });
    }
  };

  const handleSimpan = async () => {
    if (
      form.hamaPenyakit !== "" &&
      form.arrayCfUser !== "" &&
      radio.index === allData[0]?.gejala.length - 1
    ) {
      const response = await create(form);
      if (response?.data?.statusCode === 201) {
        dispatch(createIdentifikasi(response?.data?.data));
        dispatch(setPage(page === total_page ? total_page : page + 1));
        if (page !== total_page) {
          handleRadio();
          window.scrollTo(0, 0);
        } else {
          router.push("/hasil-identifikasi");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            `${response?.data?.message}` ||
            "Nampaknya terjadi kesalahan pada perhitungan di API!",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Silahkan dijawab semua pertanyaan yang tersedia!",
      });
    }
  };

  useEffect(() => {
    if (page !== 1) {
      dispatch(setPage(1));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchAllPertanyaan());
  }, [dispatch, page]);

  useEffect(() => {
    setForm({
      ...form,
      hamaPenyakit: allData[0]?._id || "",
      arrayCfUser: JSON.stringify(radio.data) || "",
    });
  }, [radio.data]);

  return (
    <Content title="Identifikasi">
      <div className="alert alert-info shadow-lg mb-4">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Silahkan dijawab semua pertanyaan yang tersedia.</span>
        </div>
      </div>
      <div className="flex flex-row px-4 py-4 justify-center items-center">
        <h1 className="text-slate-500">Hama/Penyakit: {allData[0]?.nama}</h1>
      </div>
      {allData[0]?.gejala.length > 0 &&
        allData[0]?.gejala.map((value, index) => (
          <div
            key={index}
            className="bg-white shadow overflow-hidden sm:rounded-lg mb-8"
          >
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="flex flex-row justify-between">
                    <fieldset className={value?.foto ? "w-1/2" : "w-full"}>
                      <legend className="contents text-base font-medium text-gray-900">
                        {index + 1}. {value?.pertanyaan}
                      </legend>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            onChange={(event) =>
                              handleRadio(event.target.value, index)
                            }
                            name={`cfUser-${index}`}
                            type="radio"
                            value={0.1}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            checked={radio?.data[index] === 0.1}
                          />
                          <label
                            htmlFor="cfUser"
                            className="ml-3 block text-sm font-medium text-gray-500"
                          >
                            Tidak
                          </label>
                        </div>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            onChange={(event) =>
                              handleRadio(event.target.value, index)
                            }
                            name={`cfUser-${index}`}
                            type="radio"
                            value={0.2}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            checked={radio?.data[index] === 0.2}
                          />
                          <label
                            htmlFor="cfUser"
                            className="ml-3 block text-sm font-medium text-gray-500"
                          >
                            Tidak Tahu
                          </label>
                        </div>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            onChange={(event) =>
                              handleRadio(event.target.value, index)
                            }
                            name={`cfUser-${index}`}
                            type="radio"
                            value={0.4}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            checked={radio?.data[index] === 0.4}
                          />
                          <label
                            htmlFor="cfUser"
                            className="ml-3 block text-sm font-medium text-gray-500"
                          >
                            Kurang Yakin
                          </label>
                        </div>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            onChange={(event) =>
                              handleRadio(event.target.value, index)
                            }
                            name={`cfUser-${index}`}
                            type="radio"
                            value={0.6}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            checked={radio?.data[index] === 0.6}
                          />
                          <label
                            htmlFor="cfUser"
                            className="ml-3 block text-sm font-medium text-gray-500"
                          >
                            Cukup Yakin
                          </label>
                        </div>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            onChange={(event) =>
                              handleRadio(event.target.value, index)
                            }
                            name={`cfUser-${index}`}
                            type="radio"
                            value={0.8}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            checked={radio?.data[index] === 0.8}
                          />
                          <label
                            htmlFor="cfUser"
                            className="ml-3 block text-sm font-medium text-gray-500"
                          >
                            Yakin
                          </label>
                        </div>
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            onChange={(event) =>
                              handleRadio(event.target.value, index)
                            }
                            name={`cfUser-${index}`}
                            type="radio"
                            value={1}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                            checked={radio?.data[index] === 1}
                          />
                          <label
                            htmlFor="cfUser"
                            className="ml-3 block text-sm font-medium text-gray-500"
                          >
                            Sangat Yakin
                          </label>
                        </div>
                      </div>
                    </fieldset>
                    {value?.foto && (
                      <div className="w-1/2 h-1/2 flex justify-center">
                        <img
                          src={`${API_IMAGE}/${directory}/${value?.foto}`}
                          alt="Image"
                          className="object-cover rounded-3xl"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      {/* <div className="flex justify-center mt-4">
        <div className="btn-group">
          <button
            className="btn"
            onClick={handlePrevious}
            disabled={page <= 1 ? true : false}
          >
            «
          </button>
          <button className="btn">Halaman {page}</button>
          <button
            className="btn"
            onClick={handleNext}
            disabled={page === total_page ? true : false}
          >
            »
          </button>
        </div>
      </div> */}

      <div className="flex justify-center mt-4">
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={handleSimpan}
        >
          {page === total_page ? "Identifikasi" : "Simpan"}
        </button>
      </div>
    </Content>
  );
};

export default Identifikasi;

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

  return {
    props: {
      user,
    },
  };
}
