import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';
import { Order } from 'src/app/shared/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


  formData:Order[]
  customerList: Customer[]



  constructor(private orderService: OrderService,
    private dialog: MatDialog,
    private customerService: CustomerService
 
    ) { 
     
    }



  ngOnInit() {
    this.customerService.getItem().then(res => this.customerList = res as Customer[])
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
    };
    this.orderService.orderItems=[];
  }

  AddOrEditOrderItem(orderItemIndex, orderid)
  {
    console.log(this.orderService.orderItems)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    dialogConfig.data={orderItemIndex, orderid}
    this.dialog.open(OrderItemsComponent, dialogConfig);
  }

}
