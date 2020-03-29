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

      return this.http.post(environment.apiUrl+'/order//update/'+id,body);
    }


    upDateItem(res)
    {
      var bodys = {
        orders: res,
        OrderItems: this.orderItems
      }
      
      console.log(bodys)

      return this.http.post(environment.apiUrl+'/ordersItem',bodys);
      
    }



    getOrderList(){
      return this.http.get(environment.apiUrl+'/order/allDetails').toPromise();
     }



     getOrderById(id:number)
     {
      return this.http.get(environment.apiUrl+'/ordersItem/allDetails/'+id).toPromise();
     }

     upDateDelete(orderid:number, orderItemId: number)
     {
       let orders = {
         orderid: orderid,
         orderItemId: orderItemId
       }

       console.log(orders);
              
     }
  
  
}
