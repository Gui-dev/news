import styles from './style.module.scss'

export const Header = () => {
  return (
    <header className={ styles.headerContainer }>
      <div className={ styles.headerContent }>
        <img src="/images/logo.svg" alt="Uma igmagem escrito News" title="News"/>
        <nav>
          <a href="#" className={ styles.active }>Home</a>
          <a href="#">Posts</a>
        </nav>
      </div>
    </header>
  )
}
