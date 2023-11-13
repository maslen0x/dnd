import { Injectable } from '@nestjs/common';
import { getRandomNumber } from '@/utils/random';

@Injectable()
export class DicesService {
  getDice(dice: number) {
    return getRandomNumber(1, dice);
  }
}
