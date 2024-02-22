import { Injectable } from '@angular/core';
import { RestClientService } from '@monorepo-test/shared-lib';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private restClient: RestClientService,
  ) { }

  public test = {
    askHello: () => this.restClient.get<{message?: string}>('/'),
  }
}
