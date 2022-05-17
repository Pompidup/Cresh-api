import { Test } from '@nestjs/testing';
import { InstalmentRepository } from '../../../persistence/instalment/instalment.repository';
import { Transaction } from '../../transaction/transaction';
import {
  IInstalmentRepository,
  INSTALMENT_REPOSITORY,
} from '../spi-interface/instalmentRepository.interface';
import { CreateInstalment } from './create-instalment';

describe('CreateInstalment', () => {
  let createInstalment: CreateInstalment;
  let instalmentRepository: IInstalmentRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateInstalment,
        {
          provide: INSTALMENT_REPOSITORY,
          useValue: {
            create: jest.fn(),
            getByTransaction: jest.fn(),
            getNextInstalment: jest.fn(),
            update: jest.fn(),
            isCompleted: jest.fn(),
          },
        },
      ],
    }).compile();

    createInstalment = moduleRef.get<CreateInstalment>(CreateInstalment);
    instalmentRepository = moduleRef.get<IInstalmentRepository>(
      INSTALMENT_REPOSITORY,
    );
  });

  it('should be defined', () => {
    expect(createInstalment).toBeDefined();
  });

  describe('calculateInstalment', () => {
    it('should return amout for each instalment', () => {
      const expected = [1000, 1000, 1000, 1000];

      const result = createInstalment.calculateInstalment(4000, 4);

      expect(result).toEqual(expected);
    });

    it('should return amount for each instalment with remaining amount report on first', () => {
      const expected = [1001, 1000, 1000, 1000];

      const result = createInstalment.calculateInstalment(4001, 4);

      expect(result).toEqual(expected);

      const expected2 = [5480, 5478, 5478, 5478, 5478, 5478, 5478, 5478];

      const result2 = createInstalment.calculateInstalment(43826, 8);

      expect(result2).toEqual(expected2);

      const expected3 = [1000];

      const result3 = createInstalment.calculateInstalment(1000, 1);

      expect(result3).toEqual(expected3);
    });
  });

  describe('calculateInstalmentPlannedDate', () => {
    it('should return planned_date for instalments', () => {
      const expected = [
        new Date('August 15, 2020'),
        new Date('September 15, 2020'),
        new Date('October 15, 2020'),
        new Date('November 15, 2020'),
      ];
      const firstDate = new Date('August 15, 2020');

      const result = createInstalment.calculateInstalmentPlannedDate(
        firstDate,
        4,
      );

      expect(result).toEqual(expected);
    });

    it('should return correct planned_date for special cases', () => {
      const expected = [
        new Date('August 31, 2020'),
        new Date('September 30, 2020'),
        new Date('October 31, 2020'),
        new Date('November 30, 2020'),
      ];

      const result = createInstalment.calculateInstalmentPlannedDate(
        new Date('August 31, 2020'),
        4,
      );

      expect(result).toEqual(expected);

      const expected2 = [
        new Date('October 31, 2020'),
        new Date('November 30, 2020'),
        new Date('December 31, 2020'),
        new Date('January 31, 2021'),
      ];

      const result2 = createInstalment.calculateInstalmentPlannedDate(
        new Date('October 31, 2020'),
        4,
      );

      expect(result2).toEqual(expected2);

      const startLastMonthOfYear = [
        new Date('December 31, 2020'),
        new Date('January 31, 2021'),
        new Date('Febuary 28, 2021'),
      ];

      const result_startLastMonthOfYear =
        createInstalment.calculateInstalmentPlannedDate(
          new Date('December 31, 2020'),
          3,
        );

      expect(result_startLastMonthOfYear).toEqual(startLastMonthOfYear);
    });
  });

  describe('create', () => {
    it('should throw if amount is < 1', async () => {
      const transaction: Transaction = {
        store_name: 'test',
        amount: 0,
        split: 4,
        is_completed: false,
        created_date: new Date(),
        customerId: 1,
      };
      const transactionId = 1;

      try {
        await createInstalment.create(transactionId, transaction);
      } catch (error) {
        expect(error.message).toBe('Amount must be at least 1');
      }
    });
  });
});
