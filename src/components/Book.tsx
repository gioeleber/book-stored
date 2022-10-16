import React from "react";
import { Book as BookEntity } from "@prisma/client";
import Link from "next/link";
import Button from "./Button";
import { trpc } from "../utils/trpc";
import NextLink from "./NextLink";

interface Props {
  book: BookEntity;
}

export default function Book({ book }: Props): JSX.Element {
  const trpcUtils = trpc.useContext();
  const deleteBookMutation = trpc.book.deleteBook.useMutation({
    onSuccess() {
      trpcUtils.book.getBooks.invalidate();
    },
  });

  const handleDelete = async () => {
    await deleteBookMutation.mutate({ id: book.id });
    trpcUtils.book.getBooks.invalidate();
  };

  const slug = "/books/" + book.slug;

  return (
    <li className="flex items-center justify-between">
      <NextLink href={slug}>
        {book.title} - {book.authorName} - {book.year}
      </NextLink>
      <Button isLoading={false} onClick={handleDelete}>
        x
      </Button>
    </li>
  );
}
