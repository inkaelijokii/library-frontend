import { useSubscription } from '@apollo/client'
import { BOOK_ADDED } from '../queries'
import { useState } from 'react'

const Notifications = () => {
  const [message, setMessage] = useState(null)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      setMessage(`New book added: ${book.title} by ${book.author.name}`)
      setTimeout(() => setMessage(null), 5000) // Poistaa ilmoituksen 5 sekunnin jälkeen
    },
  })

  if (!message) return null
  return <div className="notification">{message}</div>
}

export default Notifications