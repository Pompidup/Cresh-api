import { Inject, Injectable } from '@nestjs/common';
import {
  IInstalmentRepository,
  INSTALMENT_REPOSITORY,
} from '../../instalment/spi-interface/instalmentRepository.interface';
import { PayTransactionInstalmentInterface } from '../api-interface/pay-transaction-instalment.interface';
import {
  ITransactionRepository,
  TRANSACTION_REPOSITORY,
} from '../spi-interface/transactionRepository.interface';

const InstalmentRepo = () => Inject(INSTALMENT_REPOSITORY);
const TransactionRepo = () => Inject(TRANSACTION_REPOSITORY);

@Injectable()
export class PayTransactionInstalment
  implements PayTransactionInstalmentInterface
{
  constructor(
    @InstalmentRepo()
    private readonly instalmentRepository: IInstalmentRepository,
    @TransactionRepo()
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  public async payInstalment(transactionId: number): Promise<void> {
    const transaction = await this.transactionRepository.findByTransactionId(
      transactionId,
    );

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    if (transaction.is_completed) {
      throw new Error('Transaction already completed');
    }

    const nextInstalment = await this.instalmentRepository.getNextInstalment(
      transactionId,
    );

    if (!nextInstalment) {
      throw new Error('No instalment to pay');
    }

    nextInstalment.is_paid = true;
    nextInstalment.paid_date = new Date();

    await this.instalmentRepository.update(nextInstalment);

    const isCompleted = await this.instalmentRepository.isCompleted(
      transactionId,
    );

    if (isCompleted) {
      transaction.is_completed = true;
      await this.transactionRepository.update(transaction);
    }
  }
}
