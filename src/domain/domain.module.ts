import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { InstalmentModule } from './instalment/instalment.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [CustomerModule, TransactionModule, InstalmentModule],
  exports: [TransactionModule, InstalmentModule, CustomerModule],
})
export class DomainModule {}
