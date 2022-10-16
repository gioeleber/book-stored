import { useRouter } from "next/router";
import React from "react";
import NextLink from "../../components/NextLink";
import { trpc } from "../../utils/trpc";
import BookForm from "../../widgets/BookForm";

export default function Book() {
  const router = useRouter();
  const { bookSlug } = router.query;
  const book = trpc.book.getBook.useQuery({ slug: bookSlug as string });

  if (book.isLoading) return <p>Loading...</p>;
  if (book.isError || !book.data) {
    console.error(book.error);
    return <p>Error</p>;
  }
  return (
    <>
      <NextLink href="/">{"< Back to Home"}</NextLink>
      <h1 className="text-5xl font-extrabold leading-normal text-gray-700">
        {book.data.title}
      </h1>
      <p>Author: {book.data.authorName}</p>
      <p>Year: {book.data.year}</p>
      <BookForm action="edit" />
    </>
  );
}
