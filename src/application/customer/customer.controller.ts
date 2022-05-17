import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {
  CreateCustomerInterface,
  CREATE_CUSTOMER_SERVICE,
} from '../../domain/customer/api-interface/create-customer.interface';
import { Customer } from '../../domain/customer/customer';
import {
  GetAllCustomerInterface,
  GET_ALL_CUSTOMER_SERVICE,
} from '../../domain/customer/api-interface/get-all-customer.interface';
import {
  GetCustomerTransactionsInterface,
  GET_CUSTOMER_TRANSACTIONS_SERVICE,
} from '../../domain/customer/api-interface/get-customer-transactions.interface';
import { Transaction } from '../../domain/transaction/transaction';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(
    @Inject(CREATE_CUSTOMER_SERVICE)
    private readonly customerCreate: CreateCustomerInterface,
    @Inject(GET_ALL_CUSTOMER_SERVICE)
    private readonly customerGetAll: GetAllCustomerInterface,
    @Inject(GET_CUSTOMER_TRANSACTIONS_SERVICE)
    private readonly customerTransaction: GetCustomerTransactionsInterface,
  ) {}

  @Post()
  public async create(
    @Body() createCustomer: CreateCustomerDto,
  ): Promise<HttpStatus> {
    await this.customerCreate.create(createCustomer);
    return HttpStatus.CREATED;
  }

  @Get()
  public async getAll(): Promise<Customer[]> {
    return await this.customerGetAll.getAll();
  }

  @Get('/:id/transactions')
  public async getTransactions(
    @Param('id') id: string,
  ): Promise<Transaction[]> {
    return await this.customerTransaction.getTransactions(parseInt(id));
  }
}
