/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Content from "../../../components/Content";
import { useState } from "react";
import Swal from "sweetalert2";
import { update, getOne } from "../../../services/gejala";
import { useRouter } from "next/router";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import Link from "next/link";

const Ubah = ({ oneData, params }) => {
  const router = useRouter();
  const API_IMAGE = process.env.NEXT_PUBLIC_API_IMAGE;
  const directory = "gejala";

  const [form, setForm] = useState({
    kode: "",
    deskripsi: "",
    foto: "",
    imagePreview: "",
    credit: 0,
    numOfNode: 0,
  });

  useEffect(() => {
    if (Object.keys(oneData).length > 0) {
      setForm({
        ...form,
        kode: oneData?.kode || "",
        deskripsi: oneData?.deskripsi || "",
        credit: oneData?.credit || 0,
        numOfNode: oneData?.numOfNode || 0,
        imagePreview:
          oneData?.foto && oneData?.foto !== ""
            ? `${API_IMAGE}/${directory}/${oneData?.foto}`
            : "",
      });
    }
  }, []);

  const handleUploadPhoto = (event) => {
    const size = parseFloat(event?.target?.files[0]?.size / 3145728).toFixed(2);

    if (size > 2) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Maksimal size file adalah 3 MB`,
      });
    } else {
      setForm({
        ...form,
        foto: event.target.files[0],
        imagePreview: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleUbah = async () => {
    let formData = new FormData();
    formData.append("kode", form.kode);
    formData.append("deskripsi", form.deskripsi);
    formData.append("foto", form.foto);
    formData.append("credit", form.credit);
    formData.append("numOfNode", form.numOfNode);

    const response = await update(params?.id, formData);
    if (response?.data?.statusCode === 200) {
      router.push("/gejala");
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: `${response?.data?.message || "Berhasil mengubah data!"}`,
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
    <Content title="Ubah Gejala">
      <div className="max-w-2xl mx-auto">
        <Link href="/gejala">
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
            htmlFor="kode"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Kode
          </label>
          <input
            type="text"
            name="kode"
            className="input input-bordered w-full"
            required
            onChange={(event) => setForm({ ...form, kode: event.target.value })}
            value={form?.kode}
          />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="deskripsi"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Gejala
          </label>
          <input
            type="text"
            name="deskripsi"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, deskripsi: event.target.value })
            }
            value={form?.deskripsi}
          />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="credit"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Credit
          </label>
          <input
            type="number"
            min={0}
            name="credit"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, credit: event.target.value })
            }
            value={form?.credit}
          />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="numOfNode"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Num of Node
          </label>
          <input
            type="number"
            min={0}
            name="numOfNode"
            className="input input-bordered w-full"
            required
            onChange={(event) =>
              setForm({ ...form, numOfNode: event.target.value })
            }
            value={form?.numOfNode}
          />
        </div>
        <div className="relative mb-6 w-full group space-y-3">
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Unggah foto
          </label>
          {form?.imagePreview !== "" && (
            <div className="flex justify-center">
              <img
                src={form?.imagePreview}
                alt="Preview"
                className="w-1/2 h-1/2 object-cover rounded-3xl"
              />
            </div>
          )}
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
              <div className="flex flex-col items-center justify-center pt-7">
                <svg
                  className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <p className="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
                  Pilih foto
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleUploadPhoto(event)}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <button
          type="button"
          onClick={handleUbah}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Ubah
        </button>
      </div>
    </Content>
  );
};

export default Ubah;

export async function getServerSideProps({ req, params }) {
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

  const responseOneData = await getOne(params?.id, token);

  return {
    props: {
      oneData: responseOneData?.data?.data || {},
      params,
    },
  };
}
