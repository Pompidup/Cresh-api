export const PAY_TRANSACTION_INSTALMENT_SERVICE =
  'PAY_TRANSACTION_INSTALMENT_SERVICE';

export interface PayTransactionInstalmentInterface {
  payInstalment(transactionId: number): Promise<void>;
}
