import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../../application/customer/dto/create-customer.dto';
import { CreateCustomerInterface } from '../api-interface/create-customer.interface';
import { Customer } from '../customer';
import {
  CUSTOMER_REPOSITORY,
  ICustomerRepository,
} from '../spi-interface/customerRepository.interface';

const CustomerRepo = () => Inject(CUSTOMER_REPOSITORY);

@Injectable()
export class CreateCustomer implements CreateCustomerInterface {
  constructor(
    @CustomerRepo() private readonly customerRepository: ICustomerRepository,
  ) {}

  public async create(createCustomerDto: CreateCustomerDto): Promise<void> {
    Customer.validate(createCustomerDto);
    const customer: Customer = Customer.create(createCustomerDto);
    await this.customerRepository.create(customer);
  }
}
