import { Transaction } from '../../transaction/transaction';

export const CREATE_INSTALMENT_SERVICE = 'CREATE_INSTALMENT_SERVICE';

export interface CreateInstalmentInterface {
  create(transactionId: number, transaction: Transaction): void;
}
