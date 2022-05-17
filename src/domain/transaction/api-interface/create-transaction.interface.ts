import { CreateTransactionDto } from '../../../application/transaction/dto/create-transaction.dto';

export const CREATE_TRANSACTION_SERVICE = 'CREATE_TRANSACTION_SERVICE';

export interface CreateTransactionInterface {
  create(transaction: CreateTransactionDto): Promise<number>;
}
