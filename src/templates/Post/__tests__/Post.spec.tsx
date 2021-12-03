import { render, screen } from '@testing-library/react'
// import { mocked } from 'ts-jest/utils'

import { PostTemplate } from '..'
// import { getServerSideProps } from '../../../pages/posts/[slug]'
// import { getPrismicClient } from '../../../services/prismic'

const post = {
  slug: 'fake-post',
  title: 'fake-title',
  content: 'fake-content',
  updatedAt: '12-02-2021'
}

jest.mock('../../../services/prismic')

describe('<PostTemplate />', () => {
  it('should renders correctly', () => {
    render(<PostTemplate post={ post }/>)

    expect(screen.getByText(/fake-title/i)).toBeInTheDocument()
    expect(screen.getByText(/fake-content/i)).toBeInTheDocument()
  })
})
