import Link from 'next/link'

import { SignInButton } from 'components/SignInButton'
import styles from './style.module.scss'

export const Header = () => {
  return (
    <header className={ styles.headerContainer }>
      <div className={ styles.headerContent }>
        <img src="/images/logo.svg" alt="Uma igmagem escrito News" title="News"/>
        <nav>
          <Link href="/">
            <a title="Home" className={ styles.active }>Home</a>
          </Link>

          <Link href="/posts">
            <a title="Posts">Posts</a>
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
