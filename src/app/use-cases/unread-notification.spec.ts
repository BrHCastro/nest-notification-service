import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository'
import { NotificationNotFound } from './errors/notification-not-found'
import { makeNotification } from '@test/factories/notification-factory'
import { UnreadNotification } from './unread-notification'

let notificationsRepository: InMemoryNotificationsRepository
let unreadNotification: UnreadNotification

describe('Unread Notification', () => {
  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository()
    unreadNotification = new UnreadNotification(notificationsRepository)
  })

  it('should be able to unread a notification', async () => {
    const notification = makeNotification({
      readAt: new Date(),
    })

    await notificationsRepository.create(notification)

    await unreadNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationsRepository.notifications[0].readAt).toBeNull()
  })

  it('should not be able to unread a non existing notification', async () => {
    expect(() => {
      return unreadNotification.execute({
        notificationId: 'non-existent-notification-id',
      })
    }).rejects.toThrow(NotificationNotFound)
  })
})
