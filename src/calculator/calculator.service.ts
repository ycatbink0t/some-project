import { Injectable } from '@nestjs/common';
import * as assert from 'assert';
import { CoinsService } from '../coins/coins.service';
import { CalculateProfitsDto } from './dto/calculate-profits.dto';
import { CoinInformationNotFoundError } from './errors/coin-information-not-found-error';

@Injectable()
export class CalculatorService {
  constructor(private readonly coinsService: CoinsService) {}

  // reuse DTO on service layer to avoid unnecessary code duplication
  async calculateProfits(
    calculateProfitsDto: CalculateProfitsDto,
  ): Promise<number> {
    const [coinInformation] = await this.coinsService.getCoinsInformation([
      calculateProfitsDto.symbol,
    ]);
    assert(coinInformation, new CoinInformationNotFoundError());

    const { price: currentPrice } = coinInformation;
    return (
      calculateProfitsDto.amount *
      (currentPrice - calculateProfitsDto['buying-price'])
    );
  }
}
