import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { mocked } from 'ts-jest/utils'

import PostPreview, { getStaticProps } from '../../../pages/posts/preview/[slug]'
import { getPrismicClient } from '../../../services/prismic'

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

  it('should loads initial datas', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'fake-title' }],
          content: [{ type: 'paragraph', text: 'fake-content' }]
        },
        last_publication_date: '12-03-2021'
      })
    } as any)

    const response = await getStaticProps({
      params: {
        slug: 'fake-post'
      }
    })

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'fake-post',
            title: 'fake-title',
            content: '<p>fake-content</p>',
            updatedAt: '03 de dezembro de 2021'
          }
        }
      })
    )
  })
})
