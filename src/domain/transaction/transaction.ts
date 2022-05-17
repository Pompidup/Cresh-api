import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';
import { CreateTransactionDto } from '../../application/transaction/dto/create-transaction.dto';

export class Transaction {
  readonly id?: number;

  @IsString()
  @IsNotEmpty()
  store_name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  split: number;

  @IsBoolean()
  is_completed: boolean;

  @IsDate()
  created_date: Date;

  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  constructor(
    store_name: string,
    amount: number,
    split: number,
    is_completed: boolean,
    created_date: Date,
    customerId: number,
  ) {
    this.store_name = store_name;
    this.amount = amount;
    this.split = split;
    this.is_completed = is_completed;
    this.created_date = created_date;
    this.customerId = customerId;
  }

  public static create(
    createTransactionDto: CreateTransactionDto,
  ): Transaction {
    return new Transaction(
      createTransactionDto.store_name,
      createTransactionDto.amount,
      createTransactionDto.split,
      false,
      new Date(),
      createTransactionDto.customerId,
    );
  }

  public static validate(createTransactionDto: CreateTransactionDto): void {
    if (createTransactionDto.amount < 1) {
      throw new Error('Transaction amount must be greater than 0');
    }

    if (createTransactionDto.split < 1) {
      throw new Error('Transaction split must be greater than 0');
    }

    if (!createTransactionDto.customerId) {
      throw new Error('Transaction must have a customer');
    }
  }
}
