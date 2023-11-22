import { useSession } from "next-auth/react"
import Layout from "../../components/layout"

export default function MePage() {
  const { data } = useSession()

  if(!data?.user?.name) { return <>Nada</> }

  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}
