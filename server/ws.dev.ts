import { appRouter } from './api/root';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import ws from "ws";

import * as trpcNext from '@trpc/server/adapters/next';
import { NodeHTTPCreateContextFnOptions } from '@trpc/server/adapters/node-http';
import { IncomingMessage } from 'http';
import { getSession } from 'next-auth/react';
import { createInnerTRPCContext } from './api/trpc';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (
  opts:
| NodeHTTPCreateContextFnOptions<IncomingMessage, ws>
) => {
  const session = await getSession(opts);

  console.log('createContext for', session?.user?.name ?? 'unknown user');

  return createInnerTRPCContext({
    session,
  })
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const wss = new ws.Server({ port: 3001 });
const handler = applyWSSHandler({
	wss,
	router: appRouter,
	createContext
});

wss.on("connection", (ws) => {
	console.log(`WebSocket client connected. Total: ${wss.clients.size}`);

	ws.on("close", () => {
		console.log(
			`WebSocket client disconnected. Total: ${wss.clients.size}`
		);
	});
});

console.log("✔︎ WebSocket server listening on port 3001.");

process.on("SIGTERM", () => {
	console.log("SIGTERM received. Shutting down WebSocket server.");

	handler.broadcastReconnectNotification();

	// * Close the socket and terminate the process.
	wss.close(() => {
		process.exit(0);
	});
});