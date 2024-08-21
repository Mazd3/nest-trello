import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class CardsService {
  constructor(private dbService: DbService) {}
}
