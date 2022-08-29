/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Content from "../../components/Content";
import Pagination from "../../components/Pagination";
import {
  fetchAllHamaPenyakit,
  setPage,
} from "../../redux/hama-penyakit/actions";
import Swal from "sweetalert2";
import { destroy } from "../../services/hama-penyakit";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";

const HamaPenyakit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const API_IMAGE = process.env.NEXT_PUBLIC_API_IMAGE;
  const directory = "hama-penyakit";
  const { allData, keyword, page, total_page } = useSelector(
    (state) => state.hamaPenyakitReducers
  );

  const handlePrevious = () => {
    dispatch(setPage(page <= 1 ? 1 : page - 1));
  };

  const handleNext = () => {
    dispatch(setPage(page === total_page ? total_page : page + 1));
  };

  useEffect(() => {
    dispatch(fetchAllHamaPenyakit());
  }, [dispatch, keyword, page]);

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
          dispatch(fetchAllHamaPenyakit());
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
    <Content title="Hama/Penyakit">
      {allData?.length > 0 ? (
        <div
          className={
            "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
          }
        >
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-row items-center">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => router.replace("/hama-penyakit/tambah")}
              >
                Tambah
              </button>
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
                    Kode
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  >
                    Hama/Penyakit
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    }
                  ></th>
                </tr>
              </thead>
              <tbody>
                {allData.map((value, index) => (
                  <tr key={index}>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {value?.kode}
                    </td>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs max-w-3xl p-4 text-left flex items-center">
                      <img
                        src={
                          value?.foto
                            ? `${API_IMAGE}/${directory}/${value?.foto}`
                            : "/img/empty.svg"
                        }
                        className="h-12 w-12 bg-white rounded-full border"
                        alt="..."
                      ></img>{" "}
                      <span className={"ml-3 font-bold text-blueGray-600"}>
                        {value?.nama}
                      </span>
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center space-x-1">
                      <button
                        className="btn btn-ghost btn-xs capitalize"
                        onClick={() =>
                          router.replace(`/hama-penyakit/detail/${value?._id}`)
                        }
                      >
                        Detail
                      </button>
                      <button
                        className="btn btn-ghost btn-xs capitalize text-orange-500"
                        onClick={() =>
                          router.replace(`/hama-penyakit/ubah/${value?._id}`)
                        }
                      >
                        Ubah
                      </button>
                      <button
                        className="btn btn-ghost btn-xs capitalize text-red-500"
                        onClick={() => onDelete(value?._id)}
                      >
                        Hapus
                      </button>
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
      ) : (
        <div className="flex flex-col justify-center items-center">
          <img
            src="/img/empty.svg"
            alt="Empty"
            className="w-[40%] h-[40%] object-cover"
          />
          <p className="font-bold text-sky-500 my-4">
            Oops, nampaknya data masih kosong!
          </p>
          <button
            onClick={() => router.replace("/hama-penyakit/tambah")}
            type="button"
            className="inline-block px-6 py-2 mb-0 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-size-xs hover:scale-102 active:shadow-soft-xs tracking-tight-soft border-sky-500 text-sky-500 hover:border-sky-500 hover:bg-transparent hover:text-sky-500 hover:opacity-75 hover:shadow-none active:bg-sky-500 active:text-white active:hover:bg-transparent active:hover:text-sky-500"
          >
            Tambah
          </button>
        </div>
      )}
    </Content>
  );
};

export default HamaPenyakit;

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

  return {
    props: {},
  };
}
