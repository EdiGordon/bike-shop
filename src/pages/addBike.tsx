import Header from "../components/header/header";
import AddCardComponent from "../components/add-bike/AddBike";
import Layout from "../layout/layout";
import React from "react";

const AddCardPage = (): JSX.Element => {

  return (
    <Layout>
      <Header />
      <AddCardComponent />
    </Layout>
  );
};

export default AddCardPage;
