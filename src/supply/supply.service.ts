/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { SupplyInputDto } from './supply.dto';
import { StockMovementDto, StockMovementType } from '../dto/stockMovement.dto';

@Injectable()
export class SupplyService {

  constructor(private readonly httpService: HttpService) { }
  
  // Ping Pong
  public ping(): string {
    return 'pong';
  }
  
  // Issue #1 - Gestion approvisionnement
  async handleSupply(input: SupplyInputDto): Promise<void> {
    for (const product of input.products) {
      const stockMovement: StockMovementDto = {
        status: StockMovementType.Supply,
        productId: product.ean,
        quantity: product.quantity,
      };
      // Envoi l'incrément de stock
      await this.httpService.post(`/api/stock/${input.supplyId}/movement`, stockMovement).toPromise();
      // Confirme la bonne réception de la commande
      await this.httpService.post('http://microservices.tp.rjqu8633.odns.fr/api/supply-request', stockMovement).toPromise();
    }
  }
}
