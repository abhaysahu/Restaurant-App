import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http : HttpClient) { }


  
  getItem(){
    return this.http.get(environment.apiUrl+'/customer/allData').toPromise();
   }
}
