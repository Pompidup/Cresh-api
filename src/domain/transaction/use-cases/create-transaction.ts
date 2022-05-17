import { Inject, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../../../application/transaction/dto/create-transaction.dto';
import { CreateInstalment } from '../../instalment/use-cases/create-instalment';
import { CreateTransactionInterface } from '../api-interface/create-transaction.interface';
import {
  ITransactionRepository,
  TRANSACTION_REPOSITORY,
} from '../spi-interface/transactionRepository.interface';
import { Transaction } from '../transaction';

const TransactionRepo = () => Inject(TRANSACTION_REPOSITORY);

@Injectable()
export class CreateTransaction implements CreateTransactionInterface {
  constructor(
    @TransactionRepo()
    private readonly transactionRepository: ITransactionRepository,
    private readonly instalmentCreate: CreateInstalment,
  ) {}

  public async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<number> {
    Transaction.validate(createTransactionDto);
    const transaction: Transaction = Transaction.create(createTransactionDto);

    const transactionId = await this.transactionRepository.create(transaction);

    await this.instalmentCreate.create(transactionId, transaction);

    return transactionId;
  }
}
