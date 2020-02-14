import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { OrderItem } from 'src/app/shared/order-item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  formData: OrderItem
  itemList: Item[];



  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private itemService: ItemService,
    private orderService: OrderService
     
  ) 
  {  }

  ngOnInit() {

    this.itemService.getItem().then(res =>{
      this.itemList = res as Item[]
      console.log(this.itemList)

    })


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

  updatePrice(ctrl) {
    if(ctrl.selectedIndex==0) {
      this.formData.price = 0;
      this.formData.itemname = '';
    }

    else {
      this.formData.price = this.itemList[ctrl.selectedIndex-1].price
      this.formData.itemname = this.itemList[ctrl.selectedIndex-1].name
    }

    this.updateTotal();
  }

  updateTotal(){

    this.formData.total = parseFloat((this.formData.price * this.formData.quantity).toFixed(2)); 
  }

  onSubmit(form:NgForm)
  {
    console.log(form)
    this.orderService.orderItems.push(form.value);
    console.log(this.orderService.orderItems.length)
    this.dialogRef.close();
  }


}
