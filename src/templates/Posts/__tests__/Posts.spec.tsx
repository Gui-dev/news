import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'

import { PostsTemplate } from '..'
import { getStaticProps } from '../../../pages/posts'
import { getPrismicClient } from '../../../services/prismic'

const posts = [
  {
    slug: 'fake-post',
    title: 'fake-title',
    excert: 'fake-excerpt',
    updatedAt: '12-02-2021'
  }
]

jest.mock('../../../services/prismic')

describe('<PostTemplate />', () => {
  it('should renders correctly', () => {
    render(<PostsTemplate posts={posts}/>)

    expect(screen.getByText(/fake-title/i)).toBeInTheDocument()
  })

  it('should loads initial datas', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)
    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'fake-post',
            data: {
              title: [{ type: 'heading', text: 'fake-title' }],
              content: [{ type: 'paragraph', text: 'fake-excerpt' }]
            },
            last_publication_date: '12-02-2021'
          }
        ]
      })
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: 'fake-post',
              title: 'fake-title',
              excert: 'fake-excerpt',
              updatedAt: '02 de dezembro de 2021'
            }
          ]
        }
      })
    )
  })
})
