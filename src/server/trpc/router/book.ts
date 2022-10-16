import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { strToSlug } from "../../../utils/strUtils";

export const bookRouter = router({
  getBooks: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.book.findMany();
  }),
  getBook: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.book.findUnique({
        where: {
          slug: input.slug,
        },
      });
    }),
  addBook: publicProcedure
    .input(
      z.object({ title: z.string(), authorName: z.string(), year: z.number() })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.book.create({
        data: {
          title: input.title,
          slug: strToSlug(input.title),
          authorName: input.authorName,
          year: input.year,
        },
      });
    }),
  deleteBook: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.book.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
