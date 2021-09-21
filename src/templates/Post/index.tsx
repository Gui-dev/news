import Head from 'next/head'

import styles from './style.module.scss'

type PostTemplateProps = {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

export const PostTemplate = ({ post }: PostTemplateProps) => {
  return (
    <>
      <Head>
        <title>News | { post.title }</title>
      </Head>

      <main className={ styles.container }>
        <article className={ styles.post }>
          <h1>{ post.title }</h1>
          <time>{ post.updatedAt }</time>
          <div
            className={ styles.postContent }
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

        </article>
      </main>
    </>
  )
}
