import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';
import { Order } from 'src/app/shared/order.model';
//import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


  formData:Order[];
  customerList: Customer[];

  isValid:boolean = true;


  constructor(private orderService: OrderService,
    private dialog: MatDialog,
    private customerService: CustomerService,
    //private toastr: ToastrService,
    private router: Router
    ) { 
     
    }



  ngOnInit() {
    this.resetForm();

    this.customerService.getCustomer().then(res => this.customerList = res as Customer[])
    
  }



  resetForm(form? :NgForm)
  {
    if(form = null)
      form.resetForm();
    this.orderService.formData = {
      
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
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res =>{
      this.updateGrandTotal();
    });
  }

  onDeleteOrderItem(orderItemsID: number, i: number)
  {
    this.orderService.orderItems.splice(i,1);
    this.updateGrandTotal();
  }

  updateGrandTotal()
  {
    this.orderService.formData.gtotal=this.orderService.orderItems.reduce((prev,curr)=>{
      return prev+curr.total;
    },0)

    this.orderService.formData.gtotal = parseFloat((this.orderService.formData.gtotal).toFixed(2)); 
  }

  validateForm()
  {
    this.isValid = true;
    if(this.orderService.formData.customerid==0)
    {
      this.isValid=false;
    }
      
    else if (this.orderService.orderItems.length==0)
    {
      this.isValid=false;
    }
      
    else
      this.isValid=true;

      return this.isValid
  }

  
  onSubmit(form: NgForm)

  {
    if(this.validateForm())
    {
      console.log(form.value)
      this.orderService.saveOrUpdateOrder().subscribe(res =>{
        this.orderService.saveOrUpdateItem(res).subscribe(res =>{
          console.log(res)
        })
        this.resetForm();
        //this.toastr.success('Submitted Successfully','Restaurent App.');
        this.router.navigate(['/orders']);
      })

     

    }

  }

}
