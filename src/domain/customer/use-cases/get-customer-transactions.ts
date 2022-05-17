import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from '../../transaction/transaction';
import {
  ITransactionRepository,
  TRANSACTION_REPOSITORY,
} from '../../transaction/spi-interface/transactionRepository.interface';

const TransactionRepo = () => Inject(TRANSACTION_REPOSITORY);

@Injectable()
export class GetCustomerTransactions {
  constructor(
    @TransactionRepo()
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  public async getTransactions(id: number): Promise<Transaction[]> {
    return await this.transactionRepository.getByCustomer(id);
  }
}
