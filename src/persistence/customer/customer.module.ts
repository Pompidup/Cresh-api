import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { CUSTOMER_REPOSITORY } from '../../domain/customer/spi-interface/customerRepository.interface';
import { CustomerRepository } from './customer.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomerRepository,
    },
  ],
})
export class CustomerModule {}
