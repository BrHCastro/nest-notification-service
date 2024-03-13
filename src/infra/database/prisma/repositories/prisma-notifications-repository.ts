import { NotificationsRepository } from '@app/repositories/notifications-repository'
import { PrismaService } from '../prisma.service'
import { Injectable } from '@nestjs/common'
import { Notification } from '@app/entities/notification'
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    throw new Error('Method not implemented.')
  }

  async create(notification: Notification) {
    const raw = PrismaNotificationMapper.toPrisma(notification)

    await this.prismaService.notification.create({
      data: raw,
    })
  }

  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
