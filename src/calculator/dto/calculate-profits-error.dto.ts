import { CalculateProfitsDto } from './calculate-profits.dto';

export class CalculateProfitsErrorDto {
  success = false;
  // Project is too small to not avoid code duplication and write all as good as possible, so I reuse DTO in DTO
  query: CalculateProfitsDto;
  /**
   * @example '2020-07-01'
   */
  date: string;
  message: string;
}
