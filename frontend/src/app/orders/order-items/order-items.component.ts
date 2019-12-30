import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderItem } from 'src/app/shared/order-item.model';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  formData ={}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>
     
  ) { }

  ngOnInit() {
    this.formData = {
      orderitemid: null,
      orderid: this.data.orderid,
      itemid: 0,
      itemname: '',
      price: 0,
      quantity: 0,
      total: 0
    }
  }

}
