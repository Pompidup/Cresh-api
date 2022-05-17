import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationModule } from './application/application.module';
import { PrismaModule } from './database/prisma.module';
import { DomainModule } from './domain/domain.module';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    DomainModule,
    ApplicationModule,
    PersistenceModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
