import { SignInButton } from 'components/SignInButton'
import { ActiveLink } from 'components/ActiveLink'
import styles from './style.module.scss'

export const Header = () => {
  return (
    <header className={ styles.headerContainer }>
      <div className={ styles.headerContent }>
        <img src="/images/logo.svg" alt="Uma igmagem escrito News" title="News"/>
        <nav>
          <ActiveLink href="/" activeClassName={ styles.active }>
            <a title="Home">Home</a>
          </ActiveLink>

          <ActiveLink href="/posts" activeClassName={ styles.active } >
            <a title="Posts">Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
