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
import { PayTransactionInstalment } from './pay-transaction-instalment';
import { Transaction } from '../transaction';
import { Instalment } from '@prisma/client';

describe('PayTransactionInstalment', () => {
  let payTransactionInstalment: PayTransactionInstalment;
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
        PayTransactionInstalment,
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

    payTransactionInstalment = moduleRef.get<PayTransactionInstalment>(
      PayTransactionInstalment,
    );
  });

  it('should be defined', () => {
    expect(payTransactionInstalment).toBeDefined();
  });

  describe('payInstalment', () => {
    it('should be throw if transaction is not found', async () => {
      const transactionId = 1;

      jest.spyOn(repository, 'findByTransactionId').mockImplementation(() => {
        return null;
      });

      await expect(
        payTransactionInstalment.payInstalment(transactionId),
      ).rejects.toThrow('Transaction not found');
    });

    it('should be throw if transaction is already completed', async () => {
      const transactionId = 1;

      jest.spyOn(repository, 'findByTransactionId').mockResolvedValue({
        id: 1,
        store_name: 'test_store',
        amount: 1000,
        split: 5,
        is_completed: true,
        created_date: new Date(),
        customerId: 1,
      });

      await expect(
        payTransactionInstalment.payInstalment(transactionId),
      ).rejects.toThrow('Transaction already completed');
    });

    it('should be throw if instalment not found', async () => {
      const transactionId = 1;
      jest.spyOn(repository, 'findByTransactionId').mockResolvedValue({
        id: 1,
        store_name: 'test_store',
        amount: 1000,
        split: 5,
        is_completed: false,
        created_date: new Date(),
        customerId: 1,
      });
      jest
        .spyOn(instalmentRepository, 'getNextInstalment')
        .mockImplementation((transactionId) => {
          return Promise.resolve(null);
        });

      await expect(
        payTransactionInstalment.payInstalment(transactionId),
      ).rejects.toThrow('No instalment to pay');
    });

    it('should update instalment', async () => {
      const transactionId = 1;
      jest.spyOn(repository, 'findByTransactionId').mockResolvedValue({
        id: 1,
        store_name: 'test_store',
        amount: 1000,
        split: 2,
        is_completed: false,
        created_date: new Date(),
        customerId: 1,
      });

      const instalment: Instalment = {
        id: 1,
        amount: 500,
        is_paid: false,
        planned_date: new Date(),
        paid_date: new Date(),
        transactionId: 1,
      };

      jest
        .spyOn(instalmentRepository, 'getNextInstalment')
        .mockResolvedValue(instalment);

      await payTransactionInstalment.payInstalment(transactionId);

      await expect(instalmentRepository.update).toHaveBeenCalledWith({
        ...instalment,
        is_paid: true,
      });
    });

    it('should update transaction if all instalment are sold', async () => {
      const transactionId = 1;
      const transaction: Transaction = {
        id: 1,
        store_name: 'test_store',
        amount: 1000,
        split: 2,
        is_completed: false,
        created_date: new Date(),
        customerId: 1,
      };

      jest
        .spyOn(repository, 'findByTransactionId')
        .mockResolvedValue(transaction);

      const instalment: Instalment = {
        id: 1,
        amount: 500,
        is_paid: false,
        planned_date: new Date(),
        paid_date: new Date(),
        transactionId: 1,
      };

      jest
        .spyOn(instalmentRepository, 'getNextInstalment')
        .mockResolvedValue(instalment);

      jest.spyOn(instalmentRepository, 'isCompleted').mockResolvedValue(true);

      await payTransactionInstalment.payInstalment(transactionId);

      await expect(repository.update).toHaveBeenCalledWith({
        ...transaction,
        is_completed: true,
      });
    });
  });
});
