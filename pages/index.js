import Header from "../components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { login } from "../services/auth";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async () => {
    const response = await login(form);
    if (response?.data?.statusCode === 200) {
      Cookies.set("token", response?.data?.data?.token);
      router.replace("/dashboard");
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: `${response?.data?.message || "Berhasil login!"}`,
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
    <>
      <Header title="Login" />
      <div className="grid grid-cols-12">
        <div className="col-span-4 font-bold min-h-screen pl-7">
          <div className="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-start">
            <div className="row-span-4 row-start-2 text-4xl">
              Masuk
              <div className="pt-10 pr-20">
                <label className="text-sm font-medium">Nama pengguna</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Ketikkan nama pengguna"
                  className="w-full py-3 px-12 border hover:border-slate-500 rounded shadow text-base"
                  onChange={(event) =>
                    setForm({ ...form, username: event.target.value })
                  }
                />
              </div>
              <div className="pt-2 pr-20">
                <label className="text-sm font-medium">Kata sandi</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Ketikkan kata sandi"
                  className=" w-full py-3 px-12 border hover:border-slate-500 rounded shadow text-base"
                  onChange={(event) =>
                    setForm({ ...form, password: event.target.value })
                  }
                />
              </div>
              <div className="text-sm font-medium w-full pr-20 pt-14">
                <button
                  type="button"
                  className="text-center w-full py-4 bg-blue-700 hover:bg-blue-400 rounded-md text-white"
                  onClick={handleSubmit}
                >
                  MASUK
                </button>
              </div>
            </div>
            <Link href="/register">
              <button className="text-sm font-medium text-slate-400 underline">
                Belum punya akun? Daftar
              </button>
            </Link>
          </div>
        </div>

        <div
          className="col-span-8 font-bold flex flex-col justify-center items-center px-14"
          style={{
            background: `url(
              "https://images.unsplash.com/photo-1515694590185-73647ba02c10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmVlJTIwcGxhbnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            )`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <span className="text-center text-slate-100 text-3xl">
            Sistem Pakar Identifikasi Hama dan Penyakit Pada Tanaman Kopi
            Robusta Menggunakan Metode Variabel Centered Intellegent Rule
            System(VCIRS)
          </span>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  if (token)
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };

  return {
    props: {},
  };
}
