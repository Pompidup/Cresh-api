import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { TRANSACTION_REPOSITORY } from '../../domain/transaction/spi-interface/transactionRepository.interface';
import { TransactionRepository } from './transaction.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    { provide: TRANSACTION_REPOSITORY, useClass: TransactionRepository },
  ],
})
export class TransactionModule {}
