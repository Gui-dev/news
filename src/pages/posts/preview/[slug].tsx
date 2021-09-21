import { GetStaticPaths, GetStaticProps } from 'next'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { RichText } from 'prismic-dom'
import { useEffect } from 'react'
import { getPrismicClient } from 'services/prismic'

import { PostPreviewTemplate } from 'templates/PostPreview'
import { formatDate } from 'utils/formatDate'

type PostProps = {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

const PostPreview = ({ post }: PostProps) => {
  const [session] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session, post.slug, router])

  return (
    <PostPreviewTemplate post={ post }/>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const primisc = getPrismicClient()
  const response = await primisc.getByUID('post', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: formatDate(response.last_publication_date)
  }

  return {
    props: {
      post
    }
  }
}

export default PostPreview
