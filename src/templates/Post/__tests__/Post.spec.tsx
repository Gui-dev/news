import { render, screen } from '@testing-library/react'
import { getSession } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'

import { PostTemplate } from '..'
import { getServerSideProps } from '../../../pages/posts/[slug]'
import { getPrismicClient } from '../../../services/prismic'

const post = {
  slug: 'fake-post',
  title: 'fake-title',
  content: '<p>fake-content</p>',
  updatedAt: '12-02-2021'
}
jest.mock('next-auth/client')
jest.mock('../../../services/prismic')

describe('<PostTemplate />', () => {
  it('should renders correctly', () => {
    render(<PostTemplate post={ post }/>)

    expect(screen.getByText(/fake-title/i)).toBeInTheDocument()
    expect(screen.getByText(/fake-content/i)).toBeInTheDocument()
  })

  it('should redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null
    })

    const response = await getServerSideProps({
      req: {
        cookies: {}
      },
      params: {
        slug: 'fake-post'
      }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/'
        })
      })
    )
  })

  it('should loads initial datas', async () => {
    const getSessionMocked = mocked(getSession)
    const getPrismicClientMocked = mocked(getPrismicClient)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription'
    })

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'fake-title' }],
          content: [{ type: 'paragraph', text: 'fake-content' }]
        },
        last_publication_date: '12-03-2021'
      })
    } as any)

    const response = await getServerSideProps({
      req: {
        cookies: {}
      },
      params: {
        slug: 'fake-post'
      }
    } as any)

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
