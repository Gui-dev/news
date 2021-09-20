import Head from 'next/head'

import styles from './style.module.scss'

type PostProps = {
  slug: string
  title: string
  excert: string
  updatedAt: string
}

type PostsProps = {
  posts: PostProps[]
}

export const Posts = ({ posts }: PostsProps) => {
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
                <a href={`/posts/${post.slug}`}>
                  <time>{ post.updatedAt }</time>
                  <h1>{ post.title }</h1>
                  <p>{ post.excert }</p>
                </a>
              </article>
            )
          }) }

        </div>
      </main>
    </>
  )
}
