import { SubscribeButton } from 'components/SubscribeButton'
import styles from './style.module.scss'

type HomeTemplateProps = {
  product: {
    priceId: string
    amount: number
  }
}

export const HomeTemplate = ({ product }: HomeTemplateProps) => {
  return (
    <main className={ styles.contentContainer }>
      <section className={ styles.hero }>
        <span>👏 Hey, Welcome</span>
        <h1>News about<br /> the <span>React</span> world</h1>
        <p>
          Get access to all the publications <br />
          <span>for { product.amount } month</span>
        </p>

        <SubscribeButton priceId={ product.priceId }/>
      </section>

      <img src="/images/avatar.svg" alt="Girl coding on a table" />
    </main>
  )
}
