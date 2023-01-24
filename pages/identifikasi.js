/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Content from "../components/Content";
import Pagination from "../components/Pagination";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { fetchAllPertanyaan, setPage } from "../redux/identifikasi/actions";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";

const Identifikasi = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const API_IMAGE = process.env.NEXT_PUBLIC_API_IMAGE;
  const directory = "gejala";

  const { allData, page, total_page } = useSelector(
    (state) => state.identifikasiReducers
  );

  const handlePrevious = () => {
    dispatch(setPage(page <= 1 ? 1 : page - 1));
  };

  const handleNext = () => {
    dispatch(setPage(page === total_page ? total_page : page + 1));
  };

  useEffect(() => {
    dispatch(fetchAllPertanyaan());
  }, [dispatch, page]);

  const [checkboxValue, setCheckboxValue] = useState([]);

  const handleChange = (event) => {
    // Destructuring
    const { value, checked } = event.target;

    // Case 1 : The user checks the box
    if (checked) {
      setCheckboxValue([...checkboxValue, value]);
    }

    // Case 2  : The user unchecks the box
    else {
      setCheckboxValue(checkboxValue.filter((result) => result !== value));
    }
  };

  const handleIdentifikasi = async () => {
    if (checkboxValue?.length > 0) {
      const form = {
        idSelectedGejala: JSON.stringify(checkboxValue),
      };
      const response = await create(form);
      if (response?.data?.statusCode === 201) {
        Cookies.set("process", true);
        localStorage.setItem("process", JSON.stringify(response?.data?.data));
        router.replace("/hasil-identifikasi");
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: `${
            response?.data?.message || "Berhasil melakukan identifikasi!"
          }`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response?.data?.message || "Nampaknya terjadi kesalahan!"}`,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Silahkan pilih gejala yang Anda alami",
      });
    }
  };

  useEffect(() => {
    Cookies.remove("process");
    localStorage.clear();
  }, []);

  return (
    <Content title="Identifikasi">
      {allData?.length > 0 ? (
        <>
          <div className="alert shadow-lg mb-6">
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
              <span>Silahkan pilih gejala yang Anda alami.</span>
            </div>
          </div>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <tbody>
                {allData?.map((value, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="p-4 w-4">
                      <div className="flex items-center">
                        <input
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          name="idSelectedGejala"
                          onChange={(event) => handleChange(event)}
                          value={value?._id}
                          checked={checkboxValue.includes(value?._id) || false}
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <div className="flex flex-row justify-between items-center">
                        <p>{`${value?.kode} - ${value?.deskripsi}` || "-"}</p>
                        <a
                          className="pl-8"
                          href={
                            value?.foto
                              ? `${API_IMAGE}/${directory}/${value?.foto}`
                              : "#"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Gambar
                        </a>
                      </div>
                    </th>
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

          {page === total_page && (
            <div className="text-center mt-6 mb-2">
              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={handleIdentifikasi}
              >
                Proses
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <img
            src="/img/empty.svg"
            alt="Empty"
            className="w-[40%] h-[40%] object-cover"
          />
          <p className="font-bold text-sky-500 my-4">
            Oops, nampaknya gejala belum tersedia!
          </p>
        </div>
      )}
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

  return {
    props: {},
  };
}
