import { Body, Controller, Get, Post } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { CreateNotificationBody } from './create-notification-body'

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  list() {
    const notifications = this.prismaService.notification.findMany()
    return notifications
  }

  @Post()
  create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body

    const notifications = this.prismaService.notification.create({
      data: {
        category,
        content,
        recipientId,
      },
    })

    return notifications
  }
}
