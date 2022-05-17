import { Customer } from '../customer';

export const GET_ALL_CUSTOMER_SERVICE = 'GET_ALL_CUSTOMER_SERVICE';

export interface GetAllCustomerInterface {
  getAll(): Promise<Customer[]>;
}
