import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import Layout from "../../layouts/Layout";
import { trpc } from "../../utils/trpc";
import BookForm from "../../widgets/BookForm";

export default function Book() {
  const router = useRouter();
  const { slug } = router.query;
  const book = trpc.book.getBook.useQuery({ slug: slug as string });

  const [isEditFormOpen, toggleEditFormOpen] = useState(false);

  if (book.isLoading) return <p>Loading...</p>;
  if (book.isError || !book.data) {
    console.error(book.error);
    return <p>Error</p>;
  }
  return (
    <Layout>
      <Heading priority={1}>{book.data.title}</Heading>
      <p>Author: {book.data.authorName}</p>
      <p>Year: {book.data.year}</p>
      <Button
        buttonStyle="link-button"
        onClick={() => toggleEditFormOpen(!isEditFormOpen)}
      >
        Toggle edit form
      </Button>
      {isEditFormOpen && (
        <>
          <Heading priority={2}>Edit book</Heading>
          <BookForm action="edit" />
        </>
      )}
    </Layout>
  );
}
