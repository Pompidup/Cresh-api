import { Customer } from '../customer';

export const CUSTOMER_REPOSITORY = 'CUSTOMER_REPOSITORY';

export interface ICustomerRepository {
  create(customer: Customer): Promise<void>;
  getAll(): Promise<Customer[]>;
}
