import Content from "../components/Content";

const Dashboard = () => {
  return (
    <Content title="Dashboard">
      <div className="alert shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>
            SISTEM PAKAR UNTUK MENGIDENTIFIKASI HAMA DAN PENYAKIT PADA TANAMAN
            KOPI ROBUSTA MENGGUNAKAN METODE VARIABLE-CENTERED INTELLIGENT RULE
            SYSTEM (VCIRS) BERBASIS WEB.
          </span>
        </div>
      </div>
    </Content>
  );
};

export default Dashboard;

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
