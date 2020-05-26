import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Carro } from './Carro';

const baseUrl = 'http://localhost:4201';

@Injectable({
  providedIn: 'root'
})
export class CarrosService {

  constructor(private http: HttpClient) {
  }

  private async request(method: string, url: string, data?: any) {

    console.log('request ' + JSON.stringify(data));
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {
      }
    });
    return new Promise<any>((resolve, reject) => {
      result.subscribe(resolve as any, reject as any);
    });
  }

  getCarros() {
    return this.request('get', `${baseUrl}/Carro`);
  }

  getCarro(id: string) {
    return this.request('get', `${baseUrl}/Carro/${id}`);
  }

  createCarro(Carro: Carro) {
    console.log('createCarro ' + JSON.stringify(Carro));
    return this.request('post', `${baseUrl}/Carro`, Carro);
  }

  updateCarro(Carro: Carro) {
    console.log('updateCarro ' + JSON.stringify(Carro));
    return this.request('post', `${baseUrl}/Carro/${Carro.id}`, Carro);
  }

  deleteCarro(id: string) {
    return this.request('delete', `${baseUrl}/Carro/${id}`);
  }
}