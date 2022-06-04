/* eslint-disable @next/next/no-img-element */
import Content from "../../components/Content";
import { useState } from "react";
import Swal from "sweetalert2";
import { create } from "../../services/pertanyaan";
import { useRouter } from "next/router";

const Tambah = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    pertanyaan: "",
  });

  const handleTambah = async () => {
    const response = await create(form);
    if (response?.data?.statusCode === 201) {
      router.push("/pertanyaan");
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
    <Content title="Tambah Pertanyaan">
      <div className="max-w-2xl mx-auto">
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="pertanyaan"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Pertanyaan
          </label>
          <input
            type="text"
            name="pertanyaan"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, pertanyaan: event.target.value })
            }
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

  return {
    props: {},
  };
}
