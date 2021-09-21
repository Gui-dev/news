import { GetStaticProps } from 'next'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import { getPrismicClient } from 'services/prismic'
import { PostsTemplate } from 'templates/Posts'
import { formatDate } from 'utils/formatDate'

type PostProps = {
  slug: string
  title: string
  excert: string
  updatedAt: string
}

type PostsProps = {
  posts: PostProps[]
}

const posts = ({ posts }: PostsProps) => {
  return (
    <PostsTemplate posts={ posts }/>
  )
}

export default posts

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()
  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'post')
  ], {
    fetch: ['post.title', 'post.content'],
    pageSize: 100
  })

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excert: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
      updatedAt: formatDate(post.last_publication_date)
    }
  })

  return {
    props: {
      posts
    }
  }
}
