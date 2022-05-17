import { Module } from '@nestjs/common';
import { CustomerController } from './customer/customer.controller';
import { TransactionController } from './transaction/transaction.controller';
import { DomainModule } from '../domain/domain.module';
import { CREATE_CUSTOMER_SERVICE } from '../domain/customer/api-interface/create-customer.interface';
import { CreateCustomer } from '../domain/customer/use-cases/create-customer';
import { GetAllCustomer } from '../domain/customer/use-cases/get-all-customer';
import { GetCustomerTransactions } from '../domain/customer/use-cases/get-customer-transactions';
import { GET_ALL_CUSTOMER_SERVICE } from '../domain/customer/api-interface/get-all-customer.interface';
import { GET_CUSTOMER_TRANSACTIONS_SERVICE } from '../domain/customer/api-interface/get-customer-transactions.interface';
import { CreateTransaction } from '../domain/transaction/use-cases/create-transaction';
import { CREATE_TRANSACTION_SERVICE } from '../domain/transaction/api-interface/create-transaction.interface';
import { GET_INSTALMENT_SERVICE } from '../domain/transaction/api-interface/get-transaction-instalment.interface';
import { GetTransactionInstalment } from '../domain/transaction/use-cases/get-transaction-instalment';
import { PAY_TRANSACTION_INSTALMENT_SERVICE } from '../domain/transaction/api-interface/pay-transaction-instalment.interface';
import { PayTransactionInstalment } from '../domain/transaction/use-cases/pay-transaction-instalment';

@Module({
  imports: [DomainModule],
  controllers: [CustomerController, TransactionController],
  providers: [
    {
      provide: CREATE_CUSTOMER_SERVICE,
      useExisting: CreateCustomer,
    },
    { provide: GET_ALL_CUSTOMER_SERVICE, useExisting: GetAllCustomer },
    {
      provide: GET_CUSTOMER_TRANSACTIONS_SERVICE,
      useExisting: GetCustomerTransactions,
    },
    { provide: CREATE_TRANSACTION_SERVICE, useExisting: CreateTransaction },
    { provide: GET_INSTALMENT_SERVICE, useExisting: GetTransactionInstalment },
    {
      provide: PAY_TRANSACTION_INSTALMENT_SERVICE,
      useExisting: PayTransactionInstalment,
    },
  ],
})
export class ApplicationModule {}
