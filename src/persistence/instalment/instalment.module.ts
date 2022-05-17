import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { INSTALMENT_REPOSITORY } from '../../domain/instalment/spi-interface/instalmentRepository.interface';
import { InstalmentRepository } from './instalment.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    { provide: INSTALMENT_REPOSITORY, useClass: InstalmentRepository },
  ],
})
export class InstalmentModule {}
