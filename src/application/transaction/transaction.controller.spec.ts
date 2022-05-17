import { Test, TestingModule } from '@nestjs/testing';
import {
  CreateTransactionInterface,
  CREATE_TRANSACTION_SERVICE,
} from '../../domain/transaction/api-interface/create-transaction.interface';
import {
  GetInstalmentInterface,
  GET_INSTALMENT_SERVICE,
} from '../../domain/transaction/api-interface/get-transaction-instalment.interface';
import {
  PayTransactionInstalmentInterface,
  PAY_TRANSACTION_INSTALMENT_SERVICE,
} from '../../domain/transaction/api-interface/pay-transaction-instalment.interface';
import { TransactionController } from './transaction.controller';

describe('TransactionController', () => {
  let controller: TransactionController;
  let transactionCreate: CreateTransactionInterface;
  let transactionGetInstalment: GetInstalmentInterface;
  let transactionPayInstalment: PayTransactionInstalmentInterface;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: CREATE_TRANSACTION_SERVICE,
          useValue: { create: jest.fn() },
        },
        {
          provide: GET_INSTALMENT_SERVICE,
          useValue: { getInstalments: jest.fn() },
        },
        {
          provide: PAY_TRANSACTION_INSTALMENT_SERVICE,
          useValue: { payInstalment: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    transactionCreate = module.get<CreateTransactionInterface>(
      CREATE_TRANSACTION_SERVICE,
    );
    transactionGetInstalment = module.get<GetInstalmentInterface>(
      GET_INSTALMENT_SERVICE,
    );
    transactionPayInstalment = module.get<PayTransactionInstalmentInterface>(
      PAY_TRANSACTION_INSTALMENT_SERVICE,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new transaction', async () => {
      const transaction = {
        store_name: 'store_name',
        amount: 100,
        split: 4,
        customerId: 123,
      };

      jest
        .spyOn(transactionCreate, 'create')
        .mockImplementation(() => Promise.resolve(1));

      expect(await controller.create(transaction)).toBe(1);
    });
  });

  describe('getInstalments', () => {
    it('should return list of a transaction s instalments', async () => {
      const transactionId = '1';

      jest
        .spyOn(transactionGetInstalment, 'getInstalments')
        .mockImplementation(() => Promise.resolve([]));

      const result = await controller.getInstalments(transactionId);
      expect(result).toEqual([]);
      expect(transactionGetInstalment.getInstalments).toHaveBeenCalledWith(
        parseInt(transactionId),
      );
    });
  });

  describe('updateInstalments', () => {
    it('should pay next instalment', async () => {
      const transactionId = '1';

      jest
        .spyOn(transactionPayInstalment, 'payInstalment')
        .mockImplementation(() => Promise.resolve());

      await controller.updateInstalments(transactionId);
      expect(transactionPayInstalment.payInstalment).toHaveBeenCalledWith(
        parseInt(transactionId),
      );
    });
  });
});
