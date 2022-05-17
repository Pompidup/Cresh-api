import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module';
import { InstalmentRepository } from '../../persistence/instalment/instalment.repository';
import { INSTALMENT_REPOSITORY } from './spi-interface/instalmentRepository.interface';
import { CreateInstalment } from './use-cases/create-instalment';

@Module({
  imports: [PrismaModule],
  providers: [
    CreateInstalment,
    { provide: INSTALMENT_REPOSITORY, useClass: InstalmentRepository },
  ],
  exports: [CreateInstalment],
})
export class InstalmentModule {}
