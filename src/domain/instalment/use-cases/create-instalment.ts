import { Inject, Injectable } from '@nestjs/common';
import { INSTALMENT_REPOSITORY } from '../spi-interface/instalmentRepository.interface';
import { Transaction } from '../../../domain/transaction/transaction';
import { Instalment } from '../instalment';
import { CreateInstalmentInterface } from '../api-interface/create-instalment.interface';
import { IInstalmentRepository } from '../spi-interface/instalmentRepository.interface';

const InstalmentRepo = () => Inject(INSTALMENT_REPOSITORY);

@Injectable()
export class CreateInstalment implements CreateInstalmentInterface {
  constructor(
    @InstalmentRepo()
    private readonly instalmentRepository: IInstalmentRepository,
  ) {}

  public async create(
    transactionId: number,
    transaction: Transaction,
  ): Promise<void> {
    const instalmentsAmounts: number[] = this.calculateInstalment(
      transaction.amount,
      transaction.split,
    );

    const instalmentsPlannedDates: Date[] = this.calculateInstalmentPlannedDate(
      new Date(),
      transaction.split,
    );

    for (let index = 0; index < instalmentsPlannedDates.length; index++) {
      let is_paid = false;
      let paid_date = null;
      if (0 === index) {
        is_paid = true;
        paid_date = instalmentsPlannedDates[index];
      }
      const instalment: Instalment = Instalment.create(
        instalmentsAmounts[index],
        is_paid,
        instalmentsPlannedDates[index],
        paid_date,
        transactionId,
      );
      await this.instalmentRepository.create(instalment);
    }
  }

  public calculateInstalment(totalAmount: number, split: number): number[] {
    const rest = totalAmount % split;
    if (0 !== rest) {
      const instalmentAmount = (totalAmount - rest) / split;
      const instalmentAmounts = [];
      for (let i = 0; i < split; i++) {
        instalmentAmounts.push(instalmentAmount);
      }
      instalmentAmounts[0] += rest;
      return instalmentAmounts;
    }
    return Array(split).fill(totalAmount / split);
  }

  public calculateInstalmentPlannedDate(
    startDate: Date,
    split: number,
  ): Date[] {
    const instalmentPlannedDates: Date[] = [];
    let nextDate = startDate;
    const startingDate = startDate;

    for (let i = 0; i < split; i++) {
      instalmentPlannedDates.push(nextDate);
      nextDate = this.calculateNextDate(startingDate, nextDate);
    }
    return instalmentPlannedDates;
  }

  private calculateNextDate(startingDate: Date, nextDate: Date): Date {
    const daysByMonth = {
      normal: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      leap: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    };
    let nextDay: number;

    const year: number = nextDate.getFullYear();
    const month: number = nextDate.getMonth() % 12;
    const day: number = startingDate.getDate();
    const nextMonth: number = month + 1;
    const nextYear: number = year;

    const yearType =
      (year % 4 == 0 && year % 100 != 0) || year % 400 == 0 ? 'leap' : 'normal';

    if (day > daysByMonth[yearType][month + 1 < 12 ? month + 1 : 0]) {
      nextDay = daysByMonth[yearType][month + 1];
    } else {
      nextDay = day;
    }

    return new Date(nextYear, nextMonth, nextDay);
  }
}
