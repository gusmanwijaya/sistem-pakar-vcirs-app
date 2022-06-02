import Content from "../components/Content";

const Dashboard = () => {
  return (
    <Content title="Dashboard">
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, impedit
        rem ex veniam, tenetur iusto consequuntur voluptatem vitae quasi alias
        optio sed, velit commodi nobis ea. Voluptatum quos ipsum dicta!
      </p>
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
