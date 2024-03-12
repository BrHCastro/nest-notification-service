import { Body, Controller, Post } from '@nestjs/common'
import { CreateNotificationBody } from '../dtos/create-notification-body'
import { SendNotification } from '@app/use-cases/send-notification'
import { NotificationViewModel } from '../view-model/notification-view-model'

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    })

    return {
      notification: NotificationViewModel.toHTTP(notification),
    }
  }
}
