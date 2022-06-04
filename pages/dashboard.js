import Content from "../components/Content";

const Dashboard = () => {
  return <Content title="Dashboard"></Content>;
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
