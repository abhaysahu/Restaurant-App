import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderList;

  constructor(
    private orderService: OrderService,
    private router: Router
              
    ) { }

  ngOnInit() {

    this.orderService.getOrderList().then(res => {
      this.orderList = res
      console.log(this.orderList)
    })
  }

  openForEdit(orderid:number)
  {
    this.router.navigate(['/order/edit/' + orderid])

  }

}
