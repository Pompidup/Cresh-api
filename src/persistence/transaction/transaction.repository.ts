import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { ITransactionRepository } from '../../domain/transaction/spi-interface/transactionRepository.interface';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(transaction: Transaction): Promise<number> {
    const newTransaction = await this.prismaService.transaction.create({
      data: transaction,
    });

    return newTransaction.id;
  }

  public async getByCustomer(customerId: number): Promise<Transaction[]> {
    return await this.prismaService.transaction.findMany({
      where: { customerId: customerId },
    });
  }

  public async findByTransactionId(
    transactionId: number,
  ): Promise<Transaction> {
    return await this.prismaService.transaction.findUnique({
      where: { id: transactionId },
    });
  }

  public async update(transaction: Transaction): Promise<void> {
    await this.prismaService.transaction.update({
      where: { id: transaction.id },
      data: transaction,
    });
  }
}
