import { Controller, Get, Post } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { randomUUID } from 'node:crypto'

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  list() {
    const notifications = this.prismaService.notification.findMany()
    return notifications
  }

  @Post()
  create() {
    const notifications = this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        category: 'Social',
        content: 'Commodo et esse do nulla qui commodo enim in aliqua aliqua.',
        recipientId: randomUUID(),
      },
    })
    return notifications
  }
}
