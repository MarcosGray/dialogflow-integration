import { Injectable } from '@nestjs/common';

@Injectable()
export class CredentialsService {
  private privateKey: string;
  private clientEmail: string;

  constructor(){}
}
