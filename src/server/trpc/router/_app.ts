// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { bookRouter } from "./book";
import { authRouter } from "./auth";

export const appRouter = router({
  book: bookRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
