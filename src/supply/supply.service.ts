import { Injectable } from '@nestjs/common';

@Injectable()
export class SupplyService {
  public ping(): string {
    return 'pong';
  }
}
