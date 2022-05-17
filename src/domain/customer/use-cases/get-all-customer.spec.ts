import { Test } from '@nestjs/testing';
import { CreateCustomer } from './create-customer';
import {
  CUSTOMER_REPOSITORY,
  ICustomerRepository,
} from '../spi-interface/customerRepository.interface';
import { GetAllCustomer } from './get-all-customer';

describe('GetAll', () => {
  let getAll: GetAllCustomer;
  const repository: ICustomerRepository = {
    create: jest.fn(),
    getAll: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateCustomer,
        GetAllCustomer,
        {
          provide: CUSTOMER_REPOSITORY,
          useValue: repository,
        },
      ],
    }).compile();

    getAll = moduleRef.get<GetAllCustomer>(GetAllCustomer);
  });

  it('should be defined', () => {
    expect(getAll).toBeDefined();
  });

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
      .spyOn(repository, 'getAll')
      .mockImplementation(async () => Promise.resolve(customers));

    await getAll.getAll();

    expect(repository.getAll).toHaveBeenCalledWith();
  });
});
