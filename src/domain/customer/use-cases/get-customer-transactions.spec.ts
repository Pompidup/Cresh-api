import { Test } from '@nestjs/testing';
import {
  ITransactionRepository,
  TRANSACTION_REPOSITORY,
} from '../../transaction/spi-interface/transactionRepository.interface';
import { Transaction } from '../../transaction/transaction';
import { GetCustomerTransactions } from './get-customer-transactions';

describe('GetCustomer-transactions', () => {
  let getCustomerTransactions: GetCustomerTransactions;
  const transactionRepository: ITransactionRepository = {
    create: jest.fn(),
    getByCustomer: jest.fn(),
    findByTransactionId: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GetCustomerTransactions,
        {
          provide: TRANSACTION_REPOSITORY,
          useValue: transactionRepository,
        },
      ],
    }).compile();

    getCustomerTransactions = moduleRef.get<GetCustomerTransactions>(
      GetCustomerTransactions,
    );
  });

  it('should be defined', () => {
    expect(getCustomerTransactions).toBeDefined();
  });

  describe('getTransactions', () => {
    it('should return an array of transactions', async () => {
      const transactions: Transaction[] = [
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
        .spyOn(transactionRepository, 'getByCustomer')
        .mockImplementation(async () => Promise.resolve(transactions));

      const result = await getCustomerTransactions.getTransactions(1);

      expect(result).toEqual(transactions);
      expect(transactionRepository.getByCustomer).toHaveBeenCalledWith(1);
    });
  });
});
