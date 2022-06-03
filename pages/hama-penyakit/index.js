/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Content from "../../components/Content";
import LayoutTable from "../../components/LayoutTable";
import {
  fetchAllHamaPenyakit,
  setPage,
} from "../../redux/hama-penyakit/actions";
import Swal from "sweetalert2";
import { destroy } from "../../services/hama-penyakit";

const HamaPenyakit = () => {
  const dispatch = useDispatch();
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
      <LayoutTable
        thead={["Kode", "Nama"]}
        tbody={["kode", "nama"]}
        data={allData}
        urlTambah="/hama-penyakit/tambah"
        urlDetail="/hama-penyakit/detail"
        urlUbah="/hama-penyakit/ubah"
        handleDelete={(id) => onDelete(id)}
        page={page}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        disabledPrevious={page <= 1 ? true : false}
        disabledNext={page === total_page ? true : false}
      />
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

  return {
    props: {},
  };
}
