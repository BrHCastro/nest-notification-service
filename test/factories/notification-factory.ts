import { Content } from '@app/entities/content'
import { Notification, NotificationProps } from '@app/entities/notification'
import { randomUUID } from 'node:crypto'

type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'Social',
    content: new Content('You have received a friend request!'),
    recipientId: randomUUID(),
    ...override,
  })
}
