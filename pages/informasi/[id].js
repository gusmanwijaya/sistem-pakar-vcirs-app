/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";
import Content from "../../components/Content";
import { getOne } from "../../services/hama-penyakit";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Informasi = ({ oneData }) => {
  const router = useRouter();
  const API_IMAGE = process.env.NEXT_PUBLIC_API_IMAGE;
  const directory = "hama-penyakit";

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Content title="Informasi">
      <section className="h-full w-full px-8 py-8" data-aos="fade-up">
        <div className="flex flex-col items-center justify-center space-y-16">
          <div className="flex flex-row items-center justify-center space-x-12 mb-2">
            {oneData?.foto ? (
              <>
                <div className="w-full h-full text-center justify-center flex mb-12">
                  <img
                    src={
                      oneData?.foto
                        ? `${API_IMAGE}/${directory}/${oneData?.foto}`
                        : "/img/empty.svg"
                    }
                    alt=""
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
                <div className="w-full flex flex-col items-center lg:text-left text-center">
                  <h2 className="md:text-4xl text-3xl font-semibold mb-10 tracking-tight text-center">
                    {oneData?.nama}
                  </h2>
                  <p className="text-slate-500 text-sm text-justify mb-10">
                    {oneData?.deskripsi}
                  </p>
                </div>
              </>
            ) : (
              <div className="w-full flex flex-col items-center lg:text-left text-center px-32">
                <h2 className="md:text-4xl text-3xl font-semibold mb-10 tracking-tight text-center">
                  {oneData?.nama}
                </h2>
                <p className="text-slate-500 text-sm text-justify mb-10">
                  {oneData?.deskripsi}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="h-full w-full px-8 py-8 mb-12" data-aos="fade-up">
        <div className="flex flex-col">
          <h2 className="md:text-4xl text-3xl font-semibold mb-10 tracking-tight text-center">
            Gejala
          </h2>
          <ul className="flex flex-col px-56 space-y-8">
            {oneData?.gejala.length > 0 &&
              oneData?.gejala.map((value, index) => (
                <li
                  key={index}
                  className="flex flex-row items-center space-x-8"
                >
                  <div className="px-3 py-3 bg-gray-900 rounded-xl">
                    <span className="text-xl text-gray-300">{index + 1}</span>
                  </div>
                  <div className="text-slate-500 text-sm text-justify">
                    {value?.deskripsi}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>
      <section className="h-full w-full px-8 py-8 mb-12" data-aos="fade-up">
        <div className="flex flex-col">
          <h2 className="md:text-4xl text-3xl font-semibold mb-10 tracking-tight text-center">
            Solusi
          </h2>
          <ul className="flex flex-col px-32 space-y-8">
            {oneData?.solusi.length > 0 &&
              oneData?.solusi.map((value, index) => (
                <li
                  key={index}
                  className="flex flex-row items-center space-x-8"
                >
                  <div className="px-3 py-3 bg-gray-900 rounded-xl">
                    <span className="text-xl text-gray-300">{index + 1}</span>
                  </div>
                  <div className="text-slate-500 text-sm text-justify">
                    {value?.deskripsi}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </section>
      <section className="h-full w-full px-8 py-8 flex flex-col justify-center items-center">
        <button
          type="button"
          className="btn btn-ghost capitalize"
          onClick={() => router.push("/dashboard")}
        >
          Kembali
        </button>
      </section>
    </Content>
  );
};

export default Informasi;

export async function getServerSideProps({ req, params }) {
  const { token } = req.cookies;
  if (!token)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const response = await getOne(params?.id, token);

  return {
    props: {
      oneData: response?.data?.data || {},
    },
  };
}
