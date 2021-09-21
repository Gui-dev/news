import Head from 'next/head'
import Link from 'next/link'

import styles from './style.module.scss'

type PostPreviewTemplateProps = {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}

export const PostPreviewTemplate = ({ post }: PostPreviewTemplateProps) => {
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
            className={ `${styles.postContent} ${styles.previewContent}` }
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={ styles.continueReading }>
            wanna continue reading ?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}
