import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { InstalmentRepository } from '../../persistence/instalment/instalment.repository';
import { TransactionRepository } from '../../persistence/transaction/transaction.repository';
import { InstalmentModule } from '../instalment/instalment.module';
import { INSTALMENT_REPOSITORY } from '../instalment/spi-interface/instalmentRepository.interface';
import { TRANSACTION_REPOSITORY } from './spi-interface/transactionRepository.interface';
import { CreateTransaction } from './use-cases/create-transaction';
import { GetTransactionInstalment } from './use-cases/get-transaction-instalment';
import { PayTransactionInstalment } from './use-cases/pay-transaction-instalment';

@Module({
  imports: [InstalmentModule, PrismaModule],
  providers: [
    CreateTransaction,
    { provide: TRANSACTION_REPOSITORY, useClass: TransactionRepository },
    GetTransactionInstalment,
    { provide: INSTALMENT_REPOSITORY, useClass: InstalmentRepository },
    PayTransactionInstalment,
  ],
  exports: [
    CreateTransaction,
    GetTransactionInstalment,
    PayTransactionInstalment,
  ],
})
export class TransactionModule {}
