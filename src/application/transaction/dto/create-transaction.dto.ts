import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  public store_name: string;

  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @IsNumber()
  @IsNotEmpty()
  public split: number;

  @IsNumber()
  @IsNotEmpty()
  public customerId: number;
}
