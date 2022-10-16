import router, { useRouter } from "next/router";
import { FormEvent, useRef } from "react";

import Button from "../components/Button";
import Input from "../components/Input";
import { strToSlug } from "../utils/strUtils";
import { trpc } from "../utils/trpc";

interface Props {
  action: "add" | "edit";
}

export default function BookForm({ action }: Props) {
  const trpcUtils = trpc.useContext();
  const nextRouter = useRouter();
  const { bookSlug } = router.query;

  const addBookMutation = trpc.book.addBook.useMutation({
    onSuccess() {
      trpcUtils.book.getBooks.invalidate();
      resetForm();
    },
  });
  const editBookMutation = trpc.book.editBook.useMutation({
    onSuccess() {
      const newSlug = strToSlug(titleRef.current?.value ?? "");
      if (newSlug && newSlug !== bookSlug) {
        nextRouter.push("/");
        resetForm();
        return;
      }
      trpcUtils.book.getBook.invalidate();
      resetForm();
    },
  });

  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    if (titleRef.current) titleRef.current.value = "";
    if (authorRef.current) authorRef.current.value = "";
    if (yearRef.current) yearRef.current.value = "";
  };

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
    }
  };
  const handleEditBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      titleRef.current?.value ||
      authorRef.current?.value ||
      yearRef.current?.value
    ) {
      editBookMutation.mutate({
        slug: bookSlug as string,
        title: titleRef.current?.value ?? null,
        authorName: authorRef.current?.value ?? null,
        year: yearRef.current?.value ? parseInt(yearRef.current?.value) : null,
      });
    }
  };
  return (
    <form
      onSubmit={action === "add" ? handleAddBook : handleEditBook}
      className="mt-5"
    >
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
      <Button
        isLoading={
          action === "add"
            ? addBookMutation.isLoading
            : editBookMutation.isLoading
        }
      >
        {action} book
      </Button>
    </form>
  );
}
