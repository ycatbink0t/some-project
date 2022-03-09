import { Injectable } from '@nestjs/common';
import * as assert from 'assert';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
// fetch is standard for node 17.5. No need to use adapters, wrappers or inject fetch in constructor
import fetch from 'node-fetch';

import { CoinInformationDto } from './dto/coin-information.dto';
import { UnexpectedGetCoinsInformationError } from './errors/unexpected-get-coins-information-error';

@Injectable()
export class CoinsService {
  // TODO: more verbose errors
  /**
   * @throws {UnexpectedGetCoinsInformationError} if anything goes wrong in method
   */
  async getCoinsInformation(coins: string[]): Promise<CoinInformationDto[]> {
    // v8 will inline it anyway
    const getCoinsInformationUrl = new URL(
      'https://api.minerstat.com/v2/coins',
    );

    const list = coins.join(',');
    getCoinsInformationUrl.search = new URLSearchParams({ list }).toString();

    const response = await fetch(getCoinsInformationUrl.toString());
    assert.equal(
      response.status,
      200,
      new UnexpectedGetCoinsInformationError(),
    );
    assert.equal(
      response.headers.get('content-type'),
      'application/json',
      new UnexpectedGetCoinsInformationError(),
    );

    const data = await response.json();
    assert(Array.isArray(data), new UnexpectedGetCoinsInformationError());

    const result: CoinInformationDto[] = [];
    // We don't trust external sources. We have to validate response
    await Promise.all(
      data.map(async (coinInformation) => {
        const coinInformationDto = plainToInstance(
          CoinInformationDto,
          coinInformation,
        );
        const errors = await validate(coinInformationDto);
        assert(errors?.length === 0, new UnexpectedGetCoinsInformationError());

        result.push(coinInformationDto);
      }),
    );

    return result;
  }
}
