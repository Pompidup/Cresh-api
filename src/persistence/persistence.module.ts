import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { TransactionModule } from './transaction/transaction.module';
import { InstalmentModule } from './instalment/instalment.module';
import { PrismaModule } from '../database/prisma.module';
import { CustomerRepository } from './customer/customer.repository';
import { TransactionRepository } from './transaction/transaction.repository';
import { InstalmentRepository } from './instalment/instalment.repository';

@Module({
  imports: [CustomerModule, TransactionModule, InstalmentModule, PrismaModule],
  exports: [CustomerModule, TransactionModule, InstalmentModule],
  providers: [CustomerRepository, TransactionRepository, InstalmentRepository],
})
export class PersistenceModule {}
