# Real-Time Web3 Application Template

With the recent library updates it has become increasingly difficult to piece together all the modern tools.

This is a template that combines everything together so that you can avoid wasting hours reading out of date docs and battling
the intricacies of things that are less than obvious so that you can just get up and running.

## Dependencies

```ml
- Ethereum Wallet
- Next - Static and Dynamic Pages
- API: Websockets + Next Server Routes with TRPC
- Authentication: NextAuth & Siwe (Can support web2 providers with ease.)
- Wallet connection: Web3Modal, Wagmi, Viem
```

## Setting Up Your Environment

Change the name of `.env.local.example` to `.env.local`, and fill in the following two values:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=somereallysecretsecret
```

## Running the Example

You can use the following commands to run the example:

```bash
pnpm i
pnpm dev
```
