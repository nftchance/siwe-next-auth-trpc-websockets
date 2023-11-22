import Link from "next/link";
import Siwe from "~/components/siwe";
import Layout from "../components/layout";

export default function IndexPage() {
  return (
    <Layout>
      <h1>Realtime Web3</h1>
      <p>
        The framework that gives you the tools need to craft the UX your users
        want.
      </p>

      <Siwe />

      <Link href="/client">Client Side Rendering</Link>
      <Link href="/server">Server Side Rendering</Link>
    </Layout>
  );
}
