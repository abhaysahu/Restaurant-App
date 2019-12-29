import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService,
 
    ) { }



  ngOnInit() {
    this.resetForm();
  }



  resetForm(form? :NgForm)
  {
    if(form = null)
      form.resetForm();
    this.orderService.formData = {
      orderid: null,
      orderno: Math.floor(1000000+Math.random()*9000000).toString(),
      customerid:0,
      pmethod:'',
      gtotal: 0
    }
  }

}
