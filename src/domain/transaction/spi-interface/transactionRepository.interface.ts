import { Transaction } from '../transaction';

export const TRANSACTION_REPOSITORY = 'TRANSACTION_REPOSITORY';

export interface ITransactionRepository {
  create(transaction: Transaction): Promise<number>;
  getByCustomer(id: number): Promise<Transaction[]>;
  findByTransactionId(id: number): Promise<Transaction>;
  update(transaction: Transaction): Promise<void>;
}
