import { render, screen } from '@testing-library/react'
// import { useSession } from 'next-auth/client'
// import { mocked } from 'ts-jest/utils'

import { SubscribeButton } from '..'

jest.mock('next-auth/client', () => {
  return {
    useSession () {
      return [null, false]
    }
  }
})

describe('<SubscribeButton />', () => {
  it('should renders correctly', () => {
    render(<SubscribeButton />)

    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })
})
