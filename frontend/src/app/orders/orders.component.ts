import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderList;

  constructor(private orderService: OrderService) { }

  ngOnInit() {

    this.orderService.getOrderList().then(res => {
      this.orderList = res
      console.log(this.orderList)
    })
  }

}
