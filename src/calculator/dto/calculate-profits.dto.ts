import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CalculateProfitsDto {
  /**
   * crytocurrency symbol
   * @example 'BTC'
   */
  symbol: string;

  /**
   * amount in base currency
   * @example 67
   */
  @Type(() => Number)
  @IsNumber()
  amount: number;

  /**
   * the original price the coin was bought as
   * @example 5600
   */
  @Type(() => Number)
  @IsNumber()
  'buying-price': number;
}
