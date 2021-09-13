import Head from 'next/head'

import { HomeTemplate } from 'templates/Home'

export default function Home () {
  return (
    <>
      <Head>
        <title>Home | News</title>
      </Head>

      <HomeTemplate />
    </>
  )
}
