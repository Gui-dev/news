import { SubscribeButton } from 'components/SubscribeButton'
import styles from './style.module.scss'

export const HomeTemplate = () => {
  return (
    <main className={ styles.contentContainer }>
      <section className={ styles.hero }>
        <span>👏 Hey, Welcome</span>
        <h1>News about<br /> the <span>React</span> world</h1>
        <p>
          Get access to all the publications <br />
          <span>for $9.90 month</span>
        </p>

        <SubscribeButton />
      </section>

      <img src="/images/avatar.svg" alt="Girl coding on a table" />
    </main>
  )
}
