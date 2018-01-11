import { Injectable } from '@angular/core';

@Injectable()
export class GlobalsService {

  public token: string;
  public showLoading: boolean;
  public showTabBar: boolean;

  constructor() { }

}
