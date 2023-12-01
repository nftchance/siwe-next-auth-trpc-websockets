import { observable } from "@trpc/server/observable";
import { EventEmitter } from "stream";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

let counter = 0;
const ee = new EventEmitter();

export const appRouter = createTRPCRouter({
  public: publicProcedure.query(() => {
    return "you can see this message!";
  }),
  protected: protectedProcedure.query(() => {
    return "This is protected content. You can access this content because you are signed in.";
  }),
  randomNumber: publicProcedure.subscription(() => {
    return observable<number>((emit) => {
      const int = setInterval(() => {
        emit.next(Math.random());
      }, 2000);

      return () => {
        clearInterval(int);
      };
    });
  }),

  increment: protectedProcedure.mutation(() => {
    counter++;
    ee.emit("increment", counter);
    return counter;
  }),

  onIncremenet: protectedProcedure.subscription(() => {
    return observable<number>((emit) => {
      const listener = (count: number) => {
        emit.next(count);
      };

      ee.on("increment", listener);

      return () => {
        ee.off("increment", listener);
      };
    });
  }),
});

export type AppRouter = typeof appRouter;
