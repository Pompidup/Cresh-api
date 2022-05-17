import { Test } from '@nestjs/testing';
import { CreateTransaction } from './create-transaction';
import {
  ITransactionRepository,
  TRANSACTION_REPOSITORY,
} from '../spi-interface/transactionRepository.interface';
import {
  IInstalmentRepository,
  INSTALMENT_REPOSITORY,
} from '../../instalment/spi-interface/instalmentRepository.interface';
import { CreateInstalment } from '../../instalment/use-cases/create-instalment';

describe('Create', () => {
  let create: CreateTransaction;
  const repository: ITransactionRepository = {
    create: jest.fn(),
    getByCustomer: jest.fn(),
    findByTransactionId: jest.fn(),
    update: jest.fn(),
  };

  const instalmentRepository: IInstalmentRepository = {
    create: jest.fn(),
    getByTransaction: jest.fn(),
    getNextInstalment: jest.fn(),
    update: jest.fn(),
    isCompleted: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateTransaction,
        {
          provide: TRANSACTION_REPOSITORY,
          useValue: repository,
        },
        CreateInstalment,
        {
          provide: INSTALMENT_REPOSITORY,
          useValue: instalmentRepository,
        },
      ],
    }).compile();

    create = moduleRef.get<CreateTransaction>(CreateTransaction);
  });

  it('should be defined', () => {
    expect(create).toBeDefined();
  });

  it('should create a transaction', async () => {
    const transaction = {
      amount: 1000,
      split: 4,
      customerId: 1,
      store_name: 'Online Store',
    };

    jest
      .spyOn(repository, 'create')
      .mockImplementation(async (transaction) => Promise.resolve(1));

    const newTransaction = await create.create(transaction);

    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(newTransaction).toEqual(1);
  });

  it('should throw an error if transaction amount is not valid', async () => {
    const transaction = {
      amount: -100,
      split: 4,
      customerId: 1,
      store_name: 'Online Store',
    };

    try {
      await create.create(transaction);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should throw an error if transaction split is not valid', async () => {
    const transaction = {
      amount: 1000,
      split: 0,
      customerId: 1,
      store_name: 'Online Store',
    };

    try {
      await create.create(transaction);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
