import { CreateCustomerDto } from '../../../application/customer/dto/create-customer.dto';

export const CREATE_CUSTOMER_SERVICE = 'CREATE_CUSTOMER_SERVICE';

export interface CreateCustomerInterface {
  create(customer: CreateCustomerDto): void;
}
