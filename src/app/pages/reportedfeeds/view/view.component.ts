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
  allUsers:any = [];
  userGroups = [];
  dropdownList = [];
  selectedItems:any;

  selectedUserId:any;
  selectedUserName="";
  settings = {
    mode: 'external',
    actions: {
      columnTitle:"Reportd by users",
      position: 'right', // left|right
      edit:true,
      add:false,
      delete:false
    },

    add: {
      addButtonContent: '<i class="nb-person"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },

    edit: {
      editButtonContent: '<i class="nb-list"></i>',
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


      image: {
        title: 'Feed Image',
        type: 'html',
        filter: false,
        valuePrepareFunction: (image: string) => `<img width="30px" src="${this.imagesUrl}${image}" />`,
      },

      description: {
        title: 'Feed Description',
        type: 'string',
      }
      ,
       feedCat: {
         title: 'Feed Category',
         type: 'string',
      },

      
      feedStatus:{
        title: 'Action',
        type: 'custom',
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          });
        }
      },
     
    },


  };
  source: LocalDataSource = new LocalDataSource();



  constructor( 
    private http: HttpClient,
    private router: Router,
    private toast: ToastrMessages,
    private modalService: NgbModal,
    private datePipe:DatePipe,private _NgbModal: NgbModal) { 
    
  }
  ngOnInit() {
  //  this.getAllGroups();
  this.getAllUsers();
   
  }


  getAllUsers(){

    this.http.get(this.baseUrl + 'api/reportedfeeds').subscribe(
      (response: any) => {


      // response.body console.log(response.body);
          
        response.body.forEach(element => {

          element['image']=element.feed.image;
          element['description']=element.feed.description;
          element['feedCat']=element.feed.feedscategory.name;
          // element['userEmail']=element.appuser.email;
          element['feedStatus']=element.feed.status;

        });
        this.source.load(response.body);
      },
      (error) => {
  });    


  }



  onDelete(event): void {
    // if (confirm('Are you sure to delete this user?')) {
    //   this.http.delete(this.baseUrl + 'admin/user/' + event.data._id+"/delete")
    //     .subscribe(
    //       (response: any) => {
    //         if (response.message == 'User deleted successfully') {
    //              this.toast.showToast(NbToastStatus.SUCCESS, 'Users', response.message);
    //              this.getAllUsers();
    //         }
    //     });
    // }
  }

  statusChange(data){
    
    console.log(data);
    var itemStatus=data.feed.status;

    let itemId = data.feedId;
    if(itemStatus=='0'){
      itemStatus = '1';
    }else{
       itemStatus = '0';
    }

    data = {
      "status":itemStatus,
      "feedId":itemId
    }
         this.http.put(this.baseUrl + 'api/feedstatuschange',data).subscribe(
        (response: any) => {

          if (response.message == 'Status has been updated!') {
            this.toast.showToast(NbToastStatus.SUCCESS, 'Feed', response.message);
            this.getAllUsers();
          }
        },
        (error) => {
       });

  }

  viewUsrList(item, model){

   // console.log(item); 
   //private modalService: NgbModal,
   this.allUsers=[];
   this.modalService.open(model,{ size: 'lg', backdrop: 'static' });
    this.http.get(this.baseUrl + 'api/feedreporterlist/'+item.data.feedId).subscribe(
      (response: any) => {
          console.log(response);
          this.allUsers = response.body;
       
      },
      (error) => {
     });

  }


}


@Component({
  selector: 'button-view',
  template: `
    <button (click)="onClick()" *ngIf="renderValue=='0'">Enable Feed</button>
    <button (click)="onClick()" *ngIf="renderValue=='1'">Disable Feed</button>

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