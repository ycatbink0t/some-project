import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { BadRequestDto } from '../bad-request.dto';
import { InternalServerErrorDto } from '../internal-server-error.dto';
import { CalculatorService } from './calculator.service';
import { CalculateProfitsErrorDto } from './dto/calculate-profits-error.dto';
import { CalculateProfitsResultDto } from './dto/calculate-profits-result.dto';
import { CalculateProfitsDto } from './dto/calculate-profits.dto';
import { CoinInformationNotFoundError } from './errors/coin-information-not-found-error';

@Controller()
export class CalculatorController {
  constructor(private calculatorService: CalculatorService) {}

  @ApiOperation({
    summary: 'Returns the crypto profits made',
    description: 'Determines the profits made given the buying price',
  })
  @ApiBadRequestResponse({ type: BadRequestDto })
  @ApiNotFoundResponse({ type: CalculateProfitsErrorDto })
  @ApiInternalServerErrorResponse({ type: InternalServerErrorDto })
  @Get('calculate-profits')
  async calculateProfits(
    @Query() calculateProfitsDto: CalculateProfitsDto,
  ): Promise<CalculateProfitsResultDto> {
    const date = new Date().toISOString().substring(0, 10);

    try {
      const profit = await this.calculatorService.calculateProfits(
        calculateProfitsDto,
      );

      return {
        success: true,
        query: calculateProfitsDto,
        date,
        result: profit,
      };
    } catch (e) {
      if (e instanceof CoinInformationNotFoundError) {
        throw new NotFoundException({
          success: false,
          query: calculateProfitsDto,
          date,
          message: 'Symbol not found',
        } as CalculateProfitsErrorDto);
      }

      throw e;
    }
  }
}
