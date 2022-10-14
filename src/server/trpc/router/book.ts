import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const bookRouter = router({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string().nullish() }).nullish())
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input?.text ?? "world"}`,
  //     };
  //   }),
  getBooks: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.book.findMany();
  }),
  addBook: publicProcedure
    .input(
      z.object({ title: z.string(), authorName: z.string(), year: z.number() })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.book.create({
        data: {
          title: input.title,
          authorName: input.authorName,
          year: input.year,
        },
      });
    }),
});
