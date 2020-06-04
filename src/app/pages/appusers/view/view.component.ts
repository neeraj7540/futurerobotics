import { map } from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrMessages } from '../../../helpers/toaster.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { element } from '@angular/core/src/render3';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-sponsersview',
  templateUrl: './view.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ViewComponent implements OnInit {

  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;
  allGroups:any = [];
  userGroups = [];
  dropdownList = [];
  selectedItems:any;

  selectedUserId:any;
  selectedUserName="";
  settings = {
    mode: 'external',
    actions: {
      columnTitle:"",
      position: 'right', // left|right
      edit:false,
      add:false
    },

    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },

    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

    custom : [{
      name : "groups",
      title : '<i class="nb-trash"></i>'
    }]
    ,   
    columns: {

      name: {
        title: 'Name',
        type: 'string',
      },

      email:{
        title: 'Email',
        type: 'string'
      },

      dob:{

        title: 'Date of birth',
        type: 'string'

      },


      about:{
        title: 'About',
        type: 'string'

      }
      ,

      work:{
        title: 'Work',
        type: 'string'

      },

      additional:{
        title: 'Additional',
        type: 'string'

      },

      country:{
        title: 'Country',
        type: 'string'

      },

      status: {
        title: 'status',
        type: 'custom',
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          });
        }
      },
      
  
       image: {
        title: 'Image',
        type: 'html',
        filter: false,
        valuePrepareFunction: (image: string) => `<img width="30px" src="${this.imagesUrl}${image}" />`,
      }
     
    },


  };
  source: LocalDataSource = new LocalDataSource();



  constructor( 
    private http: HttpClient,
    private router: Router,
    private toast: ToastrMessages,
    private datePipe:DatePipe,private _NgbModal: NgbModal) { 
    
  }
  ngOnInit() {
  //  this.getAllGroups();
  this.getAllUsers();
   
  }


  getAllUsers(){

    this.http.get(this.baseUrl + 'api/appusers').subscribe(
      (response: any) => {
          
        console.log(response);

        response.body.forEach(element => {
          element['dob'] = new Date(element.dob).toDateString();
      
        });
        
        let userList =  response.body;
        this.source.load(userList);
      
     
      },
      (error) => {
  });    


  }



  onDelete(event): void {
    if (confirm('Are you sure to delete this user?')) {
      this.http.delete(this.baseUrl + 'api/appusers/' + event.data.id)
        .subscribe(
          (response: any) => {
            if (response.message == 'Users Successfully Deleted!') {
                 this.toast.showToast(NbToastStatus.SUCCESS, 'Users', response.message);
                 this.getAllUsers();
            }
        });
    }
  }
  
  getAllGroups(){
      this.http.get(this.baseUrl + 'categories').subscribe(
      (response: any) => {
       
      response.body.map(item=> {
        item.id = item.id;
        item.name = item.name;
        item.image = item.image;

        item['status']=false;
      }) 

      this.allGroups = response.body;
     // console.log(this.getAllGroups);
       
      },
      (error) => {
      });
  }


  modifyGroupAccess(item,event){
 
    let status='0';
    if(event){
      status='2'
    }
    
   let data= {
     groupId:item.id,
     userId:this.selectedUserId,
     status:status
   }

   this.http.put(this.baseUrl + 'updateUserGroupAccess',data).subscribe(
    (response: any) => {
      console.log(response);
    },
    (error) => {
    });
  }

  getGroupStatus(){
    return true;
  }

  statusChange(data){
    console.log(data);
    let itemStatus = 0;
    let itemId = data.id;
    if(data.status==0){
      itemStatus = 1;
    }else{
       itemStatus = 0;
    }

    data = {
      "status":itemStatus,
      "userId":itemId
    }
         this.http.put(this.baseUrl + 'api/statusupdate',data).subscribe(
        (response: any) => {

          if (response.message == 'Status updated Successfully!') {
            this.toast.showToast(NbToastStatus.SUCCESS, 'Users', response.message);
            this.getAllUsers();
          }
        },
        (error) => {
       });

  }

}



@Component({
  selector: 'button-view',
  template: `
    <button (click)="onClick()" *ngIf="renderValue==0">Activate</button>
    <button (click)="onClick()" *ngIf="renderValue==1">Deactivate</button>

  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private vewcomp:ViewComponent){

  }

  ngOnInit() {

      this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
   this.vewcomp.statusChange(this.rowData);
  }
}