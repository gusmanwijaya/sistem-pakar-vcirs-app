/* eslint-disable @next/next/no-img-element */
import Content from "../../components/Content";
import { MultiSelect } from "react-multi-select-component";
import { useState } from "react";
import Swal from "sweetalert2";
import { getForSelect as getForSelectGejala } from "../../services/gejala";
import { getForSelect as getForSelectSolusi } from "../../services/solusi";
import { create } from "../../services/hama-penyakit";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";

const Tambah = ({ dataGejala, dataSolusi }) => {
  const router = useRouter();

  let _tempForOptionsGejala = [];
  dataGejala.forEach((element) => {
    const noKode = element?.kode.split("G")[1];
    _tempForOptionsGejala.push({
      noKode: parseInt(noKode),
      label: `${element?.kode} - ${element?.deskripsi}`,
      value: element?._id,
    });
  });
  const optionsGejala = _tempForOptionsGejala.sort((a, b) => {
    return a.noKode - b.noKode;
  });

  let _tempForOptionsSolusi = [];
  dataSolusi.forEach((element) => {
    _tempForOptionsSolusi.push({
      label: `${element?.deskripsi}`,
      value: element?._id,
    });
  });
  const optionsSolusi = _tempForOptionsSolusi;

  const [form, setForm] = useState({
    kode: "",
    nama: "",
    gejala: [],
    solusi: [],
    foto: "",
    imagePreview: "",
  });
  const [showValueGejala, setShowValueGejala] = useState([]);
  const [showValueSolusi, setShowValueSolusi] = useState([]);

  const handleMultipleSelectGejala = (data) => {
    setShowValueGejala(data);
    let _tempGejala = [];
    data.map((value, index) => {
      _tempGejala.push(value?.value);
      if (_tempGejala.length > 0) {
        setForm({ ...form, gejala: _tempGejala });
      }
    });
  };

  const handleMultipleSelectSolusi = (data) => {
    setShowValueSolusi(data);
    let _tempSolusi = [];
    data.map((value, index) => {
      _tempSolusi.push(value?.value);
      if (_tempSolusi.length > 0) {
        setForm({ ...form, solusi: _tempSolusi });
      }
    });
  };

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

  const handleTambah = async () => {
    let formData = new FormData();
    formData.append("kode", form.kode);
    formData.append("nama", form.nama);
    formData.append("foto", form.foto);
    formData.append("gejala", JSON.stringify(form.gejala));
    formData.append("solusi", JSON.stringify(form.solusi));

    const response = await create(formData);
    if (response?.data?.statusCode === 201) {
      router.push("/hama-penyakit");
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
    <Content title="Tambah Hama/Penyakit">
      <div className="max-w-2xl mx-auto">
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
          />
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <label
            htmlFor="nama"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Nama
          </label>
          <input
            type="text"
            name="nama"
            className="input input-bordered w-full"
            required
            onChange={(event) => setForm({ ...form, nama: event.target.value })}
          />
        </div>
        <div className="relative mb-6 w-full group">
          <label
            htmlFor="gejala"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Gejala
          </label>
          <MultiSelect
            options={optionsGejala}
            value={showValueGejala}
            onChange={(event) => handleMultipleSelectGejala(event)}
            labelledBy="Pilih gejala"
          />
        </div>
        <div className="relative mb-6 w-full group">
          <label
            htmlFor="solusi"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            Solusi
          </label>
          <MultiSelect
            options={optionsSolusi}
            value={showValueSolusi}
            onChange={(event) => handleMultipleSelectSolusi(event)}
            labelledBy="Pilih solusi"
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
                className="w-1/2 h-1/2 object-cover"
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

  const responseGejala = await getForSelectGejala(token);
  const responseSolusi = await getForSelectSolusi(token);

  return {
    props: {
      dataGejala: responseGejala?.data?.data || [],
      dataSolusi: responseSolusi?.data?.data || [],
    },
  };
}
