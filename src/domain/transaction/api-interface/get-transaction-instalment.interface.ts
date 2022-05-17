import { Instalment } from '../../instalment/instalment';

export const GET_INSTALMENT_SERVICE = 'GET_INSTALMENT_SERVICE';

export interface GetInstalmentInterface {
  getInstalments(transactionId: number): Promise<Instalment[]>;
}
