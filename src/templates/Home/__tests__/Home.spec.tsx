import { render, screen } from '@testing-library/react'

import { HomeTemplate } from '..'

jest.mock('next/router')
jest.mock('next-auth/client', () => {
  return {
    useSession: () => [null, false]
  }
})

describe('<HomeTemplate />', () => {
  it('should renders correctly', () => {
    render(<HomeTemplate product={{ priceId: 'fake-price-id', amount: 'R$:10,00' }}/>)

    expect(screen.getByText(/R\$:10,00/i)).toBeInTheDocument()
  })
})
