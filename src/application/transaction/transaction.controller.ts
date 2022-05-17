import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Instalment } from '../../domain/instalment/instalment';
import {
  CREATE_TRANSACTION_SERVICE,
  CreateTransactionInterface,
} from '../../domain/transaction/api-interface/create-transaction.interface';
import {
  GET_INSTALMENT_SERVICE,
  GetInstalmentInterface,
} from '../../domain/transaction/api-interface/get-transaction-instalment.interface';
import {
  PayTransactionInstalmentInterface,
  PAY_TRANSACTION_INSTALMENT_SERVICE,
} from '../../domain/transaction/api-interface/pay-transaction-instalment.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(
    @Inject(CREATE_TRANSACTION_SERVICE)
    private readonly transactionCreate: CreateTransactionInterface,
    @Inject(GET_INSTALMENT_SERVICE)
    private readonly transactionGetInstalment: GetInstalmentInterface,
    @Inject(PAY_TRANSACTION_INSTALMENT_SERVICE)
    private readonly transactionPayInstalment: PayTransactionInstalmentInterface,
  ) {}

  @Post()
  public async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<number> {
    return await this.transactionCreate.create(createTransactionDto);
  }

  @Get(':id/instalments')
  public async getInstalments(@Param('id') id: string): Promise<Instalment[]> {
    return await this.transactionGetInstalment.getInstalments(parseInt(id));
  }

  @Put(':id/instalments')
  public async updateInstalments(@Param('id') id: string): Promise<void> {
    await this.transactionPayInstalment.payInstalment(parseInt(id));
  }
}
