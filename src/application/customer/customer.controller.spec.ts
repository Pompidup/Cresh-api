import { Test, TestingModule } from '@nestjs/testing';
import { CreateCustomer } from '../../domain/customer/use-cases/create-customer';
import {
  CreateCustomerInterface,
  CREATE_CUSTOMER_SERVICE,
} from '../../domain/customer/api-interface/create-customer.interface';
import { GetAllCustomer } from '../../domain/customer/use-cases/get-all-customer';
import { CustomerController } from './customer.controller';
import { GetCustomerTransactions } from '../../domain/customer/use-cases/get-customer-transactions';
import {
  GetAllCustomerInterface,
  GET_ALL_CUSTOMER_SERVICE,
} from '../../domain/customer/api-interface/get-all-customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';
import {
  GetCustomerTransactionsInterface,
  GET_CUSTOMER_TRANSACTIONS_SERVICE,
} from '../../domain/customer/api-interface/get-customer-transactions.interface';
import { Customer } from '../../domain/customer/customer';
import { Transaction } from '../../domain/transaction/transaction';

describe('CustomerController', () => {
  let customerController: CustomerController;
  let createCustomerService: CreateCustomerInterface;
  let getAllCustomerService: GetAllCustomerInterface;
  let getCustomerTransactionsService: GetCustomerTransactionsInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CREATE_CUSTOMER_SERVICE,
          useValue: { create: jest.fn() },
        },
        {
          provide: GET_ALL_CUSTOMER_SERVICE,
          useValue: { getAll: jest.fn() },
        },
        {
          provide: GET_CUSTOMER_TRANSACTIONS_SERVICE,
          useValue: { getTransactions: jest.fn() },
        },
      ],
    }).compile();

    customerController = module.get<CustomerController>(CustomerController);
    createCustomerService = module.get<CreateCustomerInterface>(
      CREATE_CUSTOMER_SERVICE,
    );
    getAllCustomerService = module.get<GetAllCustomerInterface>(
      GET_ALL_CUSTOMER_SERVICE,
    );
    getCustomerTransactionsService =
      module.get<GetCustomerTransactionsInterface>(
        GET_CUSTOMER_TRANSACTIONS_SERVICE,
      );
  });

  it('should be defined', () => {
    expect(customerController).toBeDefined();
  });

  describe('create', () => {
    it('should create a customer', async () => {
      const request: CreateCustomerDto = {
        name: 'John Doe',
      };
      jest
        .spyOn(createCustomerService, 'create')
        .mockImplementation(() => Promise.resolve());

      expect(await customerController.create(request)).toBe(201);
    });
  });

  describe('get', () => {
    it('should get all customers', async () => {
      const expected: Customer[] = [
        {
          id: 1,
          name: 'John Doe',
          created_date: new Date(),
        },
        { id: 2, name: 'Jane Doe', created_date: new Date() },
      ];

      jest
        .spyOn(getAllCustomerService, 'getAll')
        .mockImplementation(() => Promise.resolve(expected));

      expect(await customerController.getAll()).toBe(expected);
      expect(getAllCustomerService.getAll).toHaveBeenCalled();
    });
  });

  describe('getTransactions', () => {
    it('should get all transactions', async () => {
      const expected: Transaction[] = [
        {
          id: 1,
          store_name: 'Store 1',
          amount: 100,
          split: 4,
          is_completed: false,
          created_date: new Date(),
          customerId: 1,
        },
        {
          id: 2,
          store_name: 'Store 1',
          amount: 500,
          split: 2,
          is_completed: false,
          created_date: new Date(),
          customerId: 1,
        },
      ];

      jest
        .spyOn(getCustomerTransactionsService, 'getTransactions')
        .mockImplementation(() => Promise.resolve(expected));

      expect(await customerController.getTransactions('1')).toBe(expected);
      expect(getCustomerTransactionsService.getTransactions).toHaveBeenCalled();
    });

    it('should return empty array if customer have not transactions', async () => {
      const expected: Transaction[] = [];

      jest
        .spyOn(getCustomerTransactionsService, 'getTransactions')
        .mockImplementation(() => Promise.resolve(expected));

      expect(await customerController.getTransactions('1')).toBe(expected);
      expect(getCustomerTransactionsService.getTransactions).toHaveBeenCalled();
    });
  });
});
