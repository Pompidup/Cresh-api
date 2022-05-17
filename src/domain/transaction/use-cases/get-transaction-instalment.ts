import { Inject, Injectable } from '@nestjs/common';
import { Instalment } from '../../instalment/instalment';
import {
  IInstalmentRepository,
  INSTALMENT_REPOSITORY,
} from '../../instalment/spi-interface/instalmentRepository.interface';
import { GetInstalmentInterface } from '../api-interface/get-transaction-instalment.interface';

const InstalmentRepo = () => Inject(INSTALMENT_REPOSITORY);

@Injectable()
export class GetTransactionInstalment implements GetInstalmentInterface {
  constructor(
    @InstalmentRepo()
    private readonly instalmentRepository: IInstalmentRepository,
  ) {}

  public async getInstalments(transactionId: number): Promise<Instalment[]> {
    const instalments = await this.instalmentRepository.getByTransaction(
      transactionId,
    );

    return instalments;
  }
}
