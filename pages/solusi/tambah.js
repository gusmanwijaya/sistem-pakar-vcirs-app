/* eslint-disable @next/next/no-img-element */
import Content from "../../components/Content";
import { useState } from "react";
import Swal from "sweetalert2";
import { create } from "../../services/solusi";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import Link from "next/link";

const Tambah = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    deskripsi: "",
  });

  const handleTambah = async () => {
    const response = await create(form);
    if (response?.data?.statusCode === 201) {
      router.replace("/solusi");
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
    <Content title="Tambah Solusi">
      <div className="max-w-2xl mx-auto">
        <Link href="/solusi">
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
            htmlFor="deskripsi"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Solusi
          </label>
          <textarea
            name="deskripsi"
            className="textarea textarea-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, deskripsi: event.target.value })
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
