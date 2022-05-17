import { Instalment } from '../instalment';

export const INSTALMENT_REPOSITORY = 'INSTALMENT_REPOSITORY';

export interface IInstalmentRepository {
  create(instalment: Instalment): Promise<void>;
  getByTransaction(transactionId: number): Promise<Instalment[]>;
  getNextInstalment(transactionId: number): Promise<Instalment>;
  update(instalment: Instalment): Promise<void>;
  isCompleted(transactionId: number): Promise<boolean>;
}
