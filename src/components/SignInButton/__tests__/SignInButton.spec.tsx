import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'

import { SignInButton } from '..'

jest.mock('next-auth/client')

describe('<SignInButton />', () => {
  it('should component renders correctly when user is not authenticated', () => {
    const useSeesionMocked = mocked(useSession)

    useSeesionMocked.mockReturnValueOnce([null, false])

    render(<SignInButton />)

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('should component renders correctly when user is authenticated', () => {
    const useSeesionMocked = mocked(useSession)

    useSeesionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'Bruce Wayne',
          email: 'bruce@email.com',
          image: 'image.jpg'
        },
        expires: 'fake-expires'
      },
      false
    ])

    render(<SignInButton />)

    expect(screen.getByText('Bruce Wayne')).toBeInTheDocument()
  })
})
