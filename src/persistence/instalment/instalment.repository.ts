import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Instalment } from '../../domain/instalment/instalment';
import { IInstalmentRepository } from '../../domain/instalment/spi-interface/instalmentRepository.interface';

@Injectable()
export class InstalmentRepository implements IInstalmentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(instalment: Instalment): Promise<void> {
    await this.prismaService.instalment.create({ data: instalment });
  }

  public async getByTransaction(transactionId: number): Promise<Instalment[]> {
    const instalments = await this.prismaService.instalment.findMany({
      where: { transactionId },
    });

    return instalments;
  }

  public async getNextInstalment(transactionId: number): Promise<Instalment> {
    const instalment = await this.prismaService.instalment.findFirst({
      where: {
        is_paid: false,
        transactionId: transactionId,
      },
      orderBy: {
        planned_date: 'asc',
      },
    });

    return instalment;
  }

  public async update(instalment: Instalment): Promise<void> {
    await this.prismaService.instalment.update({
      where: { id: instalment.id },
      data: instalment,
    });
  }

  public async isCompleted(transactionId: number): Promise<boolean> {
    const instalments = await this.prismaService.instalment.findMany({
      where: { transactionId: transactionId },
    });

    return instalments.every((instalment) => instalment.is_paid);
  }
}
