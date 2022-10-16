import { NextPage } from "next";
import Heading from "../components/heading";
import Layout from "../layouts/Layout";
import BookForm from "../widgets/BookForm";

const AddBookPage: NextPage = () => {
  return (
    <Layout>
      <Heading priority={1}>Add Book</Heading>
      <BookForm action="add" />
    </Layout>
  );
};

export default AddBookPage;
