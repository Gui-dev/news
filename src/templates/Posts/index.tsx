import Head from 'next/head'
import Link from 'next/link'

import styles from './style.module.scss'

type PostProps = {
  slug: string
  title: string
  excert: string
  updatedAt: string
}

type PostsTemplateProps = {
  posts: PostProps[]
}

export const PostsTemplate = ({ posts }: PostsTemplateProps) => {
  return (
    <>
      <Head>
        <title>Posts | News</title>
      </Head>

      <main className={ styles.container }>
        <div className={ styles.posts }>

          { posts.map(post => {
            return (
              <article key={ String(post.slug) }>
                <Link href={`/posts/${post.slug}`}>
                  <a>
                    <time>{ post.updatedAt }</time>
                    <h1>{ post.title }</h1>
                    <p>{ post.excert }</p>
                  </a>
                </Link>
              </article>
            )
          }) }

        </div>
      </main>
    </>
  )
}
