import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import { stripe } from '../../../services/stripe'
import { HomeTemplate } from '..'
import { getStaticProps } from '../../../pages'

jest.mock('next/router')
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false]
  }
})
jest.mock('../../../services/stripe')

describe('<HomeTemplate />', () => {
  it('should renders correctly', () => {
    render(<HomeTemplate product={{ priceId: 'fake-price-id', amount: 'R$:10,00' }}/>)

    expect(screen.getByText(/R\$:10,00/i)).toBeInTheDocument()
  })

  it('should loads initial datas', async () => {
    const stripPricesRetriveMocked = mocked(stripe.prices.retrieve)
    stripPricesRetriveMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    )
  })
})
