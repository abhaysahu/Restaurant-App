import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  formData:Order;

  orders: [];
  
  orderItems:OrderItem[];

  constructor(private http: HttpClient) {}
    
    saveOrder()
    {
      var body ={
        ...this.formData,
      }

      console.log(body)

      return this.http.post(environment.apiUrl+'/order',body);
    }


    saveItem(res)
    {
      var bodys = {
        orders: res,
        OrderItems: this.orderItems
      }
      
      console.log(bodys)

      return this.http.post(environment.apiUrl+'/ordersItem',bodys);
      
    }

    upDateOrder(id)
    {
      var body ={
        ...this.formData,
      }

      console.log(body)

      return this.http.post(environment.apiUrl+'/order/update/'+id,body);
    }


    upDateItem(res,Delete)
    {
      var bodys = {
        orders: res,
        OrderItems: this.orderItems,
        Delete
      }

      console.log(bodys)
      
      let id = bodys.orders[0].orderid

      return this.http.post(environment.apiUrl+'/ordersItem/update/'+id,bodys);
      
    }



    getOrderList(){
      return this.http.get(environment.apiUrl+'/order/allDetails').toPromise();
     }



     getOrderById(id:number)
     {
      return this.http.get(environment.apiUrl+'/ordersItem/allDetails/'+id).toPromise();
     }

     upDateDelete(orderItemId: number)
     {
       return this.http.delete(environment.apiUrl+'/ordersItem/delete/'+orderItemId).toPromise();
              
     }
  
  
}
