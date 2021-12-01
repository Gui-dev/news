import { GetStaticProps } from 'next'
import Head from 'next/head'

import { stripe } from 'services/stripe'
import { formatCurrency } from 'utils/formatCurrency'
import { HomeTemplate } from 'templates/Home'

type HomeProps = {
  product: {
    priceId: string
    amount: string
  }
}

export default function Home ({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | News</title>
      </Head>

      <HomeTemplate product={ product }/>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JZUwuDBIo7Ry3hNLlSeXRlQ', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: formatCurrency({
      value: price.unit_amount / 100,
      locale: 'en-US',
      currency: 'USD'
    })
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 // 24 hours
  }
}
