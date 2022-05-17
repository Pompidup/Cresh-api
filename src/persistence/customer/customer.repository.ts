import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Customer } from '../../domain/customer/customer';
import { ICustomerRepository } from '../../domain/customer/spi-interface/customerRepository.interface';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(customer: Customer): Promise<void> {
    await this.prismaService.customer.create({ data: customer });
  }

  public async getAll(): Promise<Customer[]> {
    return await this.prismaService.customer.findMany();
  }
}
