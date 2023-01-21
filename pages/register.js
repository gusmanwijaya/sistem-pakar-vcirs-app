import Header from "../components/Header";
import Link from "next/link";
import { useState } from "react";
import { register } from "../services/auth";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleRegister = async () => {
    const response = await register(form);
    if (response?.data?.statusCode === 201) {
      router.replace("/");
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: `${response?.data?.message || "Berhasil register!"}`,
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
      <Header title="Register" />
      <div className="grid grid-cols-12">
        <div className="col-span-4 font-bold min-h-screen pl-7">
          <div className="grid grid-rows-6 grid-flow-col min-h-screen items-center justify-items-start">
            <div className="row-span-4 row-start-2 text-4xl">
              Daftar
              <div className="pt-10 pr-20">
                <label className="text-sm font-medium">Nama lengkap</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Ketikkan nama lengkap"
                  className="w-full py-3 px-12 border hover:border-slate-500 rounded shadow text-base"
                  onChange={(event) =>
                    setForm({ ...form, name: event.target.value })
                  }
                />
              </div>
              <div className="pt-2 pr-20">
                <label className="text-sm font-medium">Nama pengguna</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Ketikkan nama pengguna"
                  className=" w-full py-3 px-12 border hover:border-slate-500 rounded shadow text-base"
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
                  onClick={handleRegister}
                >
                  DAFTAR
                </button>
              </div>
            </div>
            <Link href="/">
              <button className="text-sm font-medium text-slate-400 underline">
                Sudah punya akun? Masuk
              </button>
            </Link>
          </div>
        </div>

        <div
          className="col-span-8 font-bold flex flex-col justify-center items-center px-14 bg-contain"
          style={{
            background: `url(
              "/img/aphids.jpg"
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
