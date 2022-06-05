import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Content from "../components/Content";
import { fetchPertanyaanDiagnosa, setPage } from "../redux/pertanyaan/actions";

const Diagnosa = () => {
  const dispatch = useDispatch();

  const { allData, page, total_page } = useSelector(
    (state) => state.pertanyaanReducers
  );

  const [radio, setRadio] = useState("");
  const [form, setForm] = useState({
    urutanAnswer: [],
    idGejala: [],
    nilaiAnswer: [],
  });
  let _temp = [];

  const handlePrevious = () => {
    dispatch(setPage(page <= 1 ? 1 : page - 1));
  };

  const handleNext = () => {
    dispatch(setPage(page === total_page ? total_page : page + 1));
  };

  const handleRadio = (event) => {
    setRadio(event.target.value);
  };

  const handleSimpan = () => {
    if (radio !== "") {
      allData.forEach((element) => {
        _temp.push({
          urutanAnswer: _temp.length === 0 ? 1 : _temp.length + 1,
          idGejala: element?.gejala?._id || "",
          nilaiAnswer: parseFloat(radio) || "",
        });
      });
      handleNext();
      setRadio("");
      console.log("Temp", _temp);
    } else {
      handleNext();
    }
  };

  useEffect(() => {
    dispatch(fetchPertanyaanDiagnosa());
  }, [dispatch, page]);

  return (
    <Content title="Diagnosa">
      <div className="alert alert-info shadow-lg mb-4">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Silahkan isi sesuai dengan gejala yang dialami.</span>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <fieldset>
                <legend className="contents text-base font-medium text-gray-900">
                  {allData.length > 0 &&
                    allData.map(
                      (value, index) => `${page}. ${value?.pertanyaan}`
                    )}
                </legend>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      onChange={handleRadio}
                      checked={radio === "0.1"}
                      name="nilaiAnswer"
                      type="radio"
                      value="0.1"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="nilaiAnswer"
                      className="ml-3 block text-sm font-medium text-gray-500"
                    >
                      Tidak
                    </label>
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      onChange={handleRadio}
                      checked={radio === "0.2"}
                      name="nilaiAnswer"
                      type="radio"
                      value="0.2"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="nilaiAnswer"
                      className="ml-3 block text-sm font-medium text-gray-500"
                    >
                      Tidak Tahu
                    </label>
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      onChange={handleRadio}
                      checked={radio === "0.4"}
                      name="nilaiAnswer"
                      type="radio"
                      value="0.4"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="nilaiAnswer"
                      className="ml-3 block text-sm font-medium text-gray-500"
                    >
                      Kurang Yakin
                    </label>
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      onChange={handleRadio}
                      checked={radio === "0.6"}
                      name="nilaiAnswer"
                      type="radio"
                      value="0.6"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="nilaiAnswer"
                      className="ml-3 block text-sm font-medium text-gray-500"
                    >
                      Cukup Yakin
                    </label>
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      onChange={handleRadio}
                      checked={radio === "0.8"}
                      name="nilaiAnswer"
                      type="radio"
                      value="0.8"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="nilaiAnswer"
                      className="ml-3 block text-sm font-medium text-gray-500"
                    >
                      Yakin
                    </label>
                  </div>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      onChange={handleRadio}
                      checked={radio === "1"}
                      name="nilaiAnswer"
                      type="radio"
                      value="1"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <label
                      htmlFor="nilaiAnswer"
                      className="ml-3 block text-sm font-medium text-gray-500"
                    >
                      Sangat Yakin
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                className="btn btn-accent text-white"
                onClick={handleSimpan}
              >
                {page === total_page ? "Simpan" : "Selanjutnya"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="btn-group">
          <button
            className="btn"
            onClick={handlePrevious}
            disabled={page <= 1 ? true : false}
          >
            «
          </button>
          <button className="btn">Pertanyaan {page}</button>
          <button
            className="btn"
            onClick={handleNext}
            disabled={page === total_page ? true : false}
          >
            »
          </button>
        </div>
      </div>
    </Content>
  );
};

export default Diagnosa;

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
