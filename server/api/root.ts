import { observable } from "@trpc/server/observable";
import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  public : publicProcedure.query(() => {
    return "you can see this message!";
  }),
  protected: protectedProcedure.query(() => {
    return "This is protected content. You can access this content because you are signed in.";
  }),
  randomNumber: protectedProcedure.subscription(() => {
		return observable<number>((emit) => {
			const int = setInterval(() => {
				emit.next(Math.random());
			}, 500);

			return () => {
				clearInterval(int);
			};
		});
	}),


  post: postRouter,
});

export type AppRouter = typeof appRouter;
