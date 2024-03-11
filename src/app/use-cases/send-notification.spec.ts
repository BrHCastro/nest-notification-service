import { SendNotification } from './send-notification'

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification()

    const notification = await sendNotification.execute({
      category: 'Social',
      content: 'You have received a friend request!',
      recipientId: 'example-recipient-id',
    })

    expect(notification).toBeTruthy()
  })
})
