import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { CancelNotification } from './cancel-notification'
import { Notification } from '@app/entities/notification'
import { Content } from '@app/entities/content'
import { NotificationNotFound } from './errors/notification-not-found'

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    const notification = new Notification({
      category: 'Social',
      content: new Content('You have received a friend request!'),
      recipientId: 'example-recipient-id',
    })

    await notificationsRepository.create(notification)

    await cancelNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'non-existent-notification-id',
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})
