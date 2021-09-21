import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import { api } from 'services/api'
import { getStripeJS } from 'services/stripe-js'
import styles from './style.module.scss'

type SubscribeButtonProps = {
  priceId: string
}

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  const [session] = useSession()
  const router = useRouter()

  const handleSubscribe = async () => {
    if (!session) {
      signIn('github')
      return
    }

    if (session.activeSubscription) {
      router.push('/posts')
      return
    }

    try {
      const { data } = await api.post('/subscribe')
      const { sessionId } = data
      const stripe = await getStripeJS()

      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <button
      className={ styles.subscribeButton }
      onClick={ handleSubscribe }
    >
      Subscribe now
    </button>
  )
}
