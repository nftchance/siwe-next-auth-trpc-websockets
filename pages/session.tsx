import { useSession, getSession } from "next-auth/react";
import Layout from "../components/layout";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Session } from "next-auth";

export default function ServerSidePage({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: sessionData } = useSession();

  return (
    <Layout>
      <h1>Server Side Session</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <h1>Client Side Session</h1>
      <pre>{JSON.stringify(sessionData, null, 2)}</pre>
    </Layout>
  );
}

export const getServerSideProps = (async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
}) satisfies GetServerSideProps<{ session: Session | null }>;
