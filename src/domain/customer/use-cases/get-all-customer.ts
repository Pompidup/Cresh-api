import { Inject, Injectable } from '@nestjs/common';
import { Customer } from '../customer';
import {
  CUSTOMER_REPOSITORY,
  ICustomerRepository,
} from '../spi-interface/customerRepository.interface';

const CustomerRepo = () => Inject(CUSTOMER_REPOSITORY);

@Injectable()
export class GetAllCustomer {
  constructor(
    @CustomerRepo() private readonly customerRepository: ICustomerRepository,
  ) {}

  public async getAll(): Promise<Customer[]> {
    return await this.customerRepository.getAll();
  }
}
