/* eslint-disable @next/next/no-img-element */
import Content from "../../../components/Content";
import Link from "next/link";
import { getOne } from "../../../services/pertanyaan";

const Detail = ({ oneData }) => {
  return (
    <Content title="Detail Pertanyaan">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <Link href="/pertanyaan">
            <button
              type="button"
              className="mt-1 max-w-2xl text-sm text-gray-500 flex flex-row items-center"
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
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Pertanyaan</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {oneData?.pertanyaan}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Gejala</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {oneData?.gejala?.deskripsi}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Content>
  );
};

export default Detail;

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
