import { Test } from '@nestjs/testing';
import { PrismaModule } from '../../database/prisma.module';
import { PrismaService } from '../../database/prisma.service';
import { ICustomerRepository } from '../../domain/customer/spi-interface/customerRepository.interface';
import { CustomerRepository } from './customer.repository';

describe('CustomerRepository', () => {
  let customerRepository: CustomerRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CustomerRepository,
        { provide: PrismaService, useClass: PrismaService },
      ],
    }).compile();

    customerRepository = moduleRef.get<CustomerRepository>(CustomerRepository);
  });

  it('should be defined', () => {
    expect(customerRepository).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of customers', async () => {
      const customers = [
        {
          id: 1,
          name: 'John',
          created_date: new Date(),
        },
        {
          id: 2,
          name: 'Jane',
          created_date: new Date(),
        },
      ];

      jest
        .spyOn(customerRepository, 'getAll')
        .mockImplementation(async () => Promise.resolve(customers));

      await customerRepository.getAll();

      expect(customerRepository.getAll).toHaveBeenCalledWith();
    });
  });

  describe('create', () => {
    it('should create a customer', async () => {
      const customer = {
        name: 'John',
        created_date: new Date(),
      };

      jest
        .spyOn(customerRepository, 'create')
        .mockImplementation(async () => Promise.resolve());

      await customerRepository.create(customer);

      expect(customerRepository.create).toHaveBeenCalledWith(customer);
    });
  });
});
