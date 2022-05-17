import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { CreateCustomerDto } from '../../application/customer/dto/create-customer.dto';

export class Customer {
  readonly id?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  created_date: Date;

  constructor(name: string, created_date: Date) {
    this.name = name;
    this.created_date = created_date;
  }

  public static validate(createCustomerDto: CreateCustomerDto): void {
    if (createCustomerDto.name.length < 3) {
      throw new Error('Customer name must be at least 3 characters');
    }
  }

  public static create(createCustomerDto: CreateCustomerDto): Customer {
    return new Customer(createCustomerDto.name, new Date());
  }
}
