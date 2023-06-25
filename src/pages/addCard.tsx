import Header from "../components/header/header";
import AddCardComponent from "../components/add-card/AddCard";
import Layout from "../layout/layout";

const AddCardPage = (): JSX.Element => {

  return (
    <Layout>
      <Header />
      <AddCardComponent />
    </Layout>
  );
};

export default AddCardPage;
