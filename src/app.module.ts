import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinsModule } from './coins/coins.module';
import { CalculatorModule } from './calculator/calculator.module';

@Module({
  imports: [CoinsModule, CalculatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
