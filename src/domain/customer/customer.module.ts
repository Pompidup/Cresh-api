import { Module } from '@nestjs/common';
import { GetAllCustomer } from './use-cases/get-all-customer';
import { GetCustomerTransactions } from './use-cases/get-customer-transactions';
import { CreateCustomer } from './use-cases/create-customer';
import { CUSTOMER_REPOSITORY } from './spi-interface/customerRepository.interface';
import { CustomerRepository } from '../../persistence/customer/customer.repository';
import { TRANSACTION_REPOSITORY } from '../transaction/spi-interface/transactionRepository.interface';
import { TransactionRepository } from '../../persistence/transaction/transaction.repository';
import { PrismaModule } from '../../database/prisma.module';
import { PersistenceModule } from '../../persistence/persistence.module';

@Module({
  imports: [PrismaModule, PersistenceModule],
  providers: [
    CreateCustomer,
    GetAllCustomer,
    GetCustomerTransactions,
    { provide: CUSTOMER_REPOSITORY, useClass: CustomerRepository },
    { provide: TRANSACTION_REPOSITORY, useClass: TransactionRepository },
  ],
  exports: [CreateCustomer, GetAllCustomer, GetCustomerTransactions],
})
export class CustomerModule {}
