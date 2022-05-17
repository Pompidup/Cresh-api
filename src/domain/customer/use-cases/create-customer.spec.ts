import { Test } from '@nestjs/testing';
import { CreateCustomerDto } from '../../../application/customer/dto/create-customer.dto';
import { CreateCustomer } from './create-customer';
import {
  CUSTOMER_REPOSITORY,
  ICustomerRepository,
} from '../spi-interface/customerRepository.interface';

describe('Create', () => {
  let create: CreateCustomer;
  const repository: ICustomerRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateCustomer,
        {
          provide: CUSTOMER_REPOSITORY,
          useValue: repository,
        },
      ],
    }).compile();

    create = moduleRef.get<CreateCustomer>(CreateCustomer);
  });

  it('should be defined', () => {
    expect(create).toBeDefined();
  });

  it('should call repository.create', async () => {
    const customer: CreateCustomerDto = {
      name: 'John',
    };
    jest
      .spyOn(repository, 'create')
      .mockImplementation(async (customer) => Promise.resolve());
    await create.create(customer);

    expect(repository.create).toHaveBeenCalledWith({
      name: 'John',
      created_date: expect.any(Date),
    });
  });

  it('should throw if name at least 3 characters', async () => {
    const customer: CreateCustomerDto = {
      name: 'Jo',
    };
    jest
      .spyOn(repository, 'create')
      .mockImplementation(async (customer) => Promise.resolve());

    await expect(create.create(customer)).rejects.toThrowError(
      'Customer name must be at least 3 characters',
    );
  });
});
