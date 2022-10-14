import { FormEvent, useRef } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { trpc } from "../utils/trpc";
import { APP_NAME } from "../utils/consts";
import Input from "../components/Input";
import Button from "../components/Button";

const Home: NextPage = () => {
  const books = trpc.book.getBooks.useQuery();
  const addBookMutation = trpc.book.addBook.useMutation();
  console.log(addBookMutation.isLoading);

  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleAddBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      titleRef.current?.value &&
      authorRef.current?.value &&
      yearRef.current?.value
    ) {
      addBookMutation.mutate({
        title: titleRef.current.value,
        authorName: authorRef.current.value,
        year: parseInt(yearRef.current.value),
      });
      titleRef.current.value = "";
      authorRef.current.value = "";
      yearRef.current.value = "";
    }
  };

  if (books.isLoading) return <p>Loading...</p>;
  if (books.isError) {
    console.error(books.error);
    return <p>Error</p>;
  }
  return (
    <>
      <Head>
        <title>{APP_NAME}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-extrabold leading-normal text-gray-700">
          {APP_NAME}
        </h1>

        <div className="flex w-full items-center justify-center pt-6">
          {books.data.length > 0 && (
            <ul>
              {books.data.map((book) => (
                <li key={book.id.toString()}>
                  {book.title} - {book.authorName} - {book.year}
                </li>
              ))}
            </ul>
          )}
        </div>
        <form onSubmit={handleAddBook} className="mt-5">
          <Input ref={titleRef} label="Title" placeholder="Es. Harry Potter" />
          <Input
            ref={authorRef}
            label="Author Name"
            placeholder="Es. J.K. Rowling"
          />
          <Input
            ref={yearRef}
            label="Year of Pubblication"
            placeholder="Es. 1999"
          />
          <Button isLoading={addBookMutation.isLoading}>Add Book</Button>
        </form>
      </main>
    </>
  );
};

export default Home;
