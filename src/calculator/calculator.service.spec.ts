import { Test, TestingModule } from '@nestjs/testing';
import { CoinsModule } from '../coins/coins.module';
import { CoinsService } from '../coins/coins.service';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  const testPrice = 1000;
  const coinsService = {
    async getCoinsInformation(coins: string[]): Promise<{ price: number }[]> {
      return [{ price: testPrice }];
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoinsModule],
      providers: [CalculatorService],
    })
      .overrideProvider(CoinsService)
      .useValue(coinsService)
      .compile();

    service = module.get<CalculatorService>(CalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate profit using formula: "profit = amount * (price - buyingPrice)"', async () => {
    const buyingPrice = 100;
    const amount = 10;

    const profitToTest = await service.calculateProfits({
      'buying-price': buyingPrice,
      amount,
      symbol: 'TEST',
    });

    const expectedProfit = amount * (testPrice - buyingPrice);

    expect(profitToTest).toBe(expectedProfit);
  });
});
