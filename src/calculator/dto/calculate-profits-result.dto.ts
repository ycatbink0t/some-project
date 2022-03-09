import { CalculateProfitsDto } from './calculate-profits.dto';

export class CalculateProfitsResultDto {
  success = true;
  // Project is too small to not avoid code duplication and write all as good as possible, so I reuse DTO in DTO
  query: CalculateProfitsDto;
  /**
   * @example '2020-07-01'
   */
  date: string;
  /**
   * @example 1975200
   */
  result: number;
}
