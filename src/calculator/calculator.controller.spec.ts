import { Test, TestingModule } from '@nestjs/testing';
import { CoinsModule } from '../coins/coins.module';
import { CalculatorController } from './calculator.controller';
import { CalculatorService } from './calculator.service';

describe('CalculatorController', () => {
  let controller: CalculatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoinsModule],
      providers: [CalculatorService],
      controllers: [CalculatorController],
    }).compile();

    controller = module.get<CalculatorController>(CalculatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
