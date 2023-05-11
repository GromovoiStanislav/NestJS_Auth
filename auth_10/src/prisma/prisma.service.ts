import { PrismaClient } from '.prisma/client';
import { INestApplication, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  // constructor(config: ConfigService) {
  //   const url = config.get<string>('DATABASE_URL');
  //   super({
  //     datasources: {
  //       db: {
  //         url,
  //       },
  //     },
  //   });
  // }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;
    // teardown logic
    return Promise.all([this.user.deleteMany()]);
  }
}
