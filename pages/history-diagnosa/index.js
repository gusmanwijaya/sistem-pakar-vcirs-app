/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Content from "../../components/Content";
import LayoutTable from "../../components/LayoutTable";
import { fetchAllDiagnosa, setPage } from "../../redux/diagnosa/actions";
import Swal from "sweetalert2";
import { destroy } from "../../services/diagnosa";
import jwtDecode from "jwt-decode";

const HistoryDiagnosa = ({ users }) => {
  const dispatch = useDispatch();
  const { allData, page, total_page } = useSelector(
    (state) => state.diagnosaReducers
  );

  const handlePrevious = () => {
    dispatch(setPage(page <= 1 ? 1 : page - 1));
  };

  const handleNext = () => {
    dispatch(setPage(page === total_page ? total_page : page + 1));
  };

  useEffect(() => {
    dispatch(fetchAllDiagnosa(users?.role !== "admin" ? users?._id : ""));
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
          dispatch(fetchAllDiagnosa(users?.role !== "admin" ? users?._id : ""));
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
    <Content title="History Diagnosa">
      <LayoutTable
        thead={["Tanggal", "Persentase"]}
        tbody={["tanggal", "percentage"]}
        data={allData}
        urlDetail="/history-diagnosa/detail"
        handleDelete={users?.role === "admin" ? (id) => onDelete(id) : false}
        page={page}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        disabledPrevious={page <= 1 ? true : false}
        disabledNext={page === total_page ? true : false}
      />
    </Content>
  );
};

export default HistoryDiagnosa;

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

  return {
    props: {
      users,
    },
  };
}
