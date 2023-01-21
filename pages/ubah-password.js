import Content from "../components/Content";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ubahPassword } from "../services/pengaturan";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const UbahPassword = ({ users }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleLogout = () => {
    Cookies.remove("process");
    Cookies.remove("token");
    sessionStorage.clear();
    localStorage.clear();
    router.replace("/");
  };

  const handleSave = async () => {
    if (
      form?.currentPassword !== "" &&
      form?.newPassword !== "" &&
      form?.confirmNewPassword !== ""
    ) {
      const response = await ubahPassword(users?._id, form);
      if (response?.data?.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Sukses",
          text: `${response?.data?.message || "Berhasil mengubah password!"}`,
        });
        handleLogout();
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
        text: `${response?.data?.message || "Nampaknya terjadi kesalahan!"}`,
      });
    }
  };

  return (
    <Content title="UbahPassword">
      <div className="max-w-2xl mx-auto">
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Password saat ini
          </label>
          <input
            type="password"
            name="currentPassword"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, currentPassword: event.target.value })
            }
          />
        </div>

        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Password baru
          </label>
          <input
            type="password"
            name="newPassword"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, newPassword: event.target.value })
            }
          />
        </div>

        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="confirmNewPassword"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Konfirmasi password baru
          </label>
          <input
            type="password"
            name="confirmNewPassword"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, confirmNewPassword: event.target.value })
            }
          />
        </div>
        <button
          onClick={handleSave}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Simpan
        </button>
      </div>
    </Content>
  );
};

export default UbahPassword;

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
    props: { users },
  };
}
