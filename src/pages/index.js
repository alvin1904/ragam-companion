import Dashboard from '@/components/Dashboard/Dashboard'
import TokenCheck from '@/helper/TokenCheck'
import Head from 'next/head'

export default function Home() {
  return (
    <TokenCheck>
      <Head>
        <title>Ragam-Companion</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </TokenCheck>
  )
}
