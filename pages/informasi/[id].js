/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";
import Content from "../../components/Content";
import { getOne } from "../../services/hama-penyakit";

const Informasi = ({ oneData }) => {
  const router = useRouter();
  const API_IMAGE = process.env.NEXT_PUBLIC_API_IMAGE;
  const directory = "hama-penyakit";

  return (
    <Content title="Informasi">
      <section className="h-full w-full px-20 py-8">
        <div className="flex flex-col items-center justify-center">
          {oneData?.foto && (
            <div className="w-full lg:w-1/2 text-center justify-center flex mb-12">
              <img
                id="hero"
                src={
                  oneData?.foto
                    ? `${API_IMAGE}/${directory}/${oneData?.foto}`
                    : "/img/empty.svg"
                }
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          )}
          <div className="w-full flex flex-col items-center lg:text-left text-center px-20">
            <h2 className="md:text-4xl text-3xl font-semibold mb-10 tracking-tight text-center">
              {oneData?.nama}
            </h2>
            <p className="text-slate-500 text-sm text-justify mb-10">
              {oneData?.deskripsi}
            </p>
            <h2 className="md:text-4xl text-3xl font-semibold mb-10 tracking-tight text-center">
              Gejala
            </h2>
            <ul>
              {oneData?.gejala.length > 0 &&
                oneData?.gejala.map((value, index) => (
                  <li className="mb-8" key={index}>
                    <h4 className="font-medium text-2xl mb-5 flex lg:flex-row flex-col items-center lg:justify-start justify-center">
                      <span className="bg-slate-200 h-12 w-12 text-xl flex items-center justify-center lg:mr-5 lg:mb-0 mb-5 text-black rounded-full">
                        {index + 1}
                      </span>
                      <p className="text-base leading-7 tracking-wide text-justify">
                        {value?.deskripsi}
                      </p>
                    </h4>
                  </li>
                ))}
            </ul>
            <h2 className="md:text-4xl text-3xl font-semibold mb-10 tracking-tight text-center">
              Solusi
            </h2>
            <ul>
              {oneData?.solusi.length > 0 &&
                oneData?.solusi.map((value, index) => (
                  <li className="mb-8" key={index}>
                    <h4 className="font-medium text-2xl mb-5 flex flex-row items-center justify-start">
                      <p className="text-base leading-7 tracking-wide text-justify">
                        {value?.deskripsi}
                      </p>
                    </h4>
                  </li>
                ))}
            </ul>
            <button
              onClick={() => router.push("/dashboard")}
              type="button"
              className="btn btn-primary btn-outline"
            >
              Kembali
            </button>
          </div>
        </div>
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
