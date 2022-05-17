import { Test } from '@nestjs/testing';
import { Instalment } from '@prisma/client';
import {
  IInstalmentRepository,
  INSTALMENT_REPOSITORY,
} from '../../instalment/spi-interface/instalmentRepository.interface';
import { GetTransactionInstalment } from './get-transaction-instalment';

describe('getInstalments', () => {
  let getInstalments: GetTransactionInstalment;

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
        GetTransactionInstalment,
        {
          provide: INSTALMENT_REPOSITORY,
          useValue: instalmentRepository,
        },
      ],
    }).compile();

    getInstalments = moduleRef.get<GetTransactionInstalment>(
      GetTransactionInstalment,
    );
  });

  it('should be defined', () => {
    expect(getInstalments).toBeDefined();
  });

  describe('getInstalments', () => {
    it('should return an array of instalments', async () => {
      const expectedInstalments: Instalment[] = [
        {
          id: 1,
          amount: 1000,
          is_paid: true,
          planned_date: new Date(),
          paid_date: new Date(),
          transactionId: 1,
        },
        {
          id: 1,
          amount: 1000,
          is_paid: false,
          planned_date: new Date(),
          paid_date: null,
          transactionId: 1,
        },
      ];

      jest
        .spyOn(instalmentRepository, 'getByTransaction')
        .mockImplementation(async () => Promise.resolve(expectedInstalments));

      const result = await getInstalments.getInstalments(1);

      expect(instalmentRepository.getByTransaction).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedInstalments);
    });
  });
});
