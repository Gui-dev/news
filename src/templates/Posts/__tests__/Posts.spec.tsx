import { render, screen } from '@testing-library/react'
// import { mocked } from 'ts-jest/utils'

import { PostsTemplate } from '..'
// import { getStaticProps } from '../../../pages/posts'

const posts = [
  {
    slug: 'fake-slug',
    title: 'fake-title',
    excert: 'fake-excerpt',
    updatedAt: 'fake-date'
  }
]

describe('<PostTemplate />', () => {
  it('should renders correctly', () => {
    render(<PostsTemplate posts={posts}/>)

    expect(screen.getByText(/fake-title/i)).toBeInTheDocument()
  })
})
