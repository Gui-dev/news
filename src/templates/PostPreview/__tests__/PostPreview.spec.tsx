import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { mocked } from 'ts-jest/utils'

import PostPreview from '../../../pages/posts/preview/[slug]'
// import { getPrismicClient } from '../../../services/prismic'

const post = {
  slug: 'fake-post',
  title: 'fake-title',
  content: '<p>fake-content</p>',
  updatedAt: '12-02-2021'
}
jest.mock('next-auth/client')
jest.mock('next/router')
jest.mock('../../../services/prismic')

describe('<PostPreviewTemplate />', () => {
  it('should renders correctly', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])

    render(<PostPreview post={ post }/>)

    expect(screen.getByText(/fake-title/i)).toBeInTheDocument()
    expect(screen.getByText(/fake-content/i)).toBeInTheDocument()
    expect(screen.getByText('wanna continue reading ?')).toBeInTheDocument()
  })

  it('should redirect user to full post when user is subscribed', async () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)
    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      {
        activeSubscription: 'fake-active-subscription'
      },
      false
    ])

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<PostPreview post={ post }/>)

    expect(pushMock).toHaveBeenCalledWith('/posts/fake-post')
  })
})
