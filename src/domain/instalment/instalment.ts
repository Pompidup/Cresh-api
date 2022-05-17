import { IsNumber, IsNotEmpty, IsBoolean, IsDate } from 'class-validator';

export class Instalment {
  readonly id?: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsBoolean()
  is_paid: boolean;

  @IsDate()
  @IsNotEmpty()
  planned_date: Date;

  @IsDate()
  paid_date: Date;

  @IsNumber()
  @IsNotEmpty()
  transactionId: number;

  constructor(
    amount: number,
    is_paid: boolean,
    planned_date: Date,
    paid_date: Date,
    transactionId: number,
  ) {
    this.amount = amount;
    this.is_paid = is_paid;
    this.planned_date = planned_date;
    this.paid_date = paid_date;
    this.transactionId = transactionId;
  }

  public static create(
    amount: number,
    is_paid: boolean,
    planned_date: Date,
    paid_date: Date,
    transactionId: number,
  ): Instalment {
    return new Instalment(
      amount,
      is_paid,
      planned_date,
      paid_date,
      transactionId,
    );
  }

  public static validate(instalment: Instalment): void {
    if (instalment.amount < 1) {
      throw new Error('Amount must be at least 1');
    }
  }
}
