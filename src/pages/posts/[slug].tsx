import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import { RichText } from 'prismic-dom'
import { getPrismicClient } from 'services/prismic'

import { PostTemplate } from 'templates/Post'
import { formatDate } from 'utils/formatDate'

type PostProps = {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

const Post = ({ post }: PostProps) => {
  return (
    <PostTemplate post={ post }/>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req })
  const { slug } = params

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const primisc = getPrismicClient(req)
  const response = await primisc.getByUID('post', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: formatDate(response.last_publication_date)
  }

  return {
    props: {
      post
    }
  }
}

export default Post
