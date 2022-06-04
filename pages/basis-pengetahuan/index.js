/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Content from "../../components/Content";
import {
  fetchAllBasisPengetahuan,
  setPage,
} from "../../redux/basis-pengetahuan/actions";
import Swal from "sweetalert2";
import { destroy } from "../../services/basis-pengetahuan";
import { useRouter } from "next/router";

const BasisPengetahuan = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { allData, page, total_page } = useSelector(
    (state) => state.basisPengetahuanReducers
  );

  const handlePrevious = () => {
    dispatch(setPage(page <= 1 ? 1 : page - 1));
  };

  const handleNext = () => {
    dispatch(setPage(page === total_page ? total_page : page + 1));
  };

  useEffect(() => {
    dispatch(fetchAllBasisPengetahuan());
  }, [dispatch, page]);

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
          dispatch(fetchAllBasisPengetahuan());
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
    <Content title="Basis Pengetahuan">
      <div className="flex flex-col justify-center items-start space-y-4">
        <button
          onClick={() => {
            router.push(`/basis-pengetahuan/tambah`);
          }}
          className="btn btn-xs btn-outline btn-info capitalize"
        >
          Tambah
        </button>
        {allData.length > 0 ? (
          <>
            <div className="overflow-x-auto w-full">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Hama/Penyakit</th>
                    <th>Gejala</th>
                    <th>CF Pakar</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allData.map((value, index) => (
                    <tr key={index}>
                      <td>{value?.hamaPenyakit?.nama}</td>
                      <td>
                        {value?.gejala?.deskripsi.length > 110
                          ? value?.gejala?.deskripsi.slice(0, 110)
                          : value?.gejala?.deskripsi}
                      </td>
                      <td>{value?.cfPakar}</td>
                      <th className="w-1/12">
                        <div className="flex flex-row justify-center items-center space-x-1">
                          <button
                            onClick={() => {
                              router.push(
                                `/basis-pengetahuan/detail/${value?._id}`
                              );
                            }}
                            className="btn btn-ghost btn-xs capitalize"
                          >
                            Detail
                          </button>
                          <button
                            onClick={() => {
                              router.push(
                                `/basis-pengetahuan/ubah/${value?._id}`
                              );
                            }}
                            className="btn btn-ghost btn-xs capitalize text-orange-500"
                          >
                            Ubah
                          </button>
                          <button
                            onClick={() => onDelete(value?._id)}
                            className="btn btn-ghost btn-xs capitalize text-red-500"
                          >
                            Hapus
                          </button>
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="btn-group">
              <button
                className="btn"
                onClick={handlePrevious}
                disabled={page <= 1 ? true : false}
              >
                «
              </button>
              <button className="btn">Page {page}</button>
              <button
                className="btn"
                onClick={handleNext}
                disabled={page === total_page ? true : false}
              >
                »
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center space-y-1">
            <img
              src="/img/empty.svg"
              alt="Empty"
              className="w-1/2 h-1/2 object-cover"
            />
            <p className="text-slate-500">Oops, nampaknya data masih kosong!</p>
          </div>
        )}
      </div>
    </Content>
  );
};

export default BasisPengetahuan;

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
