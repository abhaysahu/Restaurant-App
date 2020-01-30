import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  formData ={};
  itemList: Item[];



  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private itemService: ItemService
     
  ) 
  { 
    this.itemService.getItem().then(res =>{
      this.itemList = res as Item[]
      console.log(this.itemList)

    })
    
  }

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

}
