import { Transaction } from '../../transaction/transaction';

export const GET_CUSTOMER_TRANSACTIONS_SERVICE =
  'GET_CUSTOMER_TRANSACTIONS_SERVICE';

export interface GetCustomerTransactionsInterface {
  getTransactions(id: number): Promise<Transaction[]>;
}
