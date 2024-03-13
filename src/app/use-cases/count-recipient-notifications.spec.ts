import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { Notification } from '@app/entities/notification'
import { Content } from '@app/entities/content'
import { CountRecipientNotifications } from './count-recipient-notifications'

describe('Count Recipient Notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    )

    await notificationsRepository.create(
      new Notification({
        category: 'Social',
        content: new Content('You have received a friend request!'),
        recipientId: 'recipient-1',
      }),
    )
    await notificationsRepository.create(
      new Notification({
        category: 'Social',
        content: new Content('You have received a friend request!'),
        recipientId: 'recipient-1',
      }),
    )
    await notificationsRepository.create(
      new Notification({
        category: 'Social',
        content: new Content('You have received a friend request!'),
        recipientId: 'recipient-2',
      }),
    )

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    })

    expect(count).toEqual(2)
  })
})
