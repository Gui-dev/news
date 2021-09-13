import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './style.module.scss'

export const SignInButton = () => {
  const isUserLoggedIn = true

  return isUserLoggedIn
    ? (
      <button className={ styles.signInButton }>
        <FaGithub color="#04B361"/>
        Gui Silva
        <FiX color="#737380" className={ styles.closeIcon }/>
      </button>
      )
    : (
      <button className={ styles.signInButton }>
        <FaGithub color="#EBA417"/>
        Sign in with Github
      </button>
      )
}
