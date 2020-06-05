import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
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
      edit:false
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

      image: {
        title: 'Feed Image',
        type: 'html',
        filter: false,
        valuePrepareFunction: (image: string) => `<img width="30px" src="${this.imagesUrl}${image}" />`,
      },

      description:{
        title: 'description',
        type: 'string'
      },

      addedBy:{
        title: 'Added by',
        type: 'string'
      },

      status:{
        title: 'Feed Status',
        type: 'string'
      },
      
      

     
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
  this.getAllItems();
   
  }


  getAllItems(){

    this.http.get(this.baseUrl + 'api/allfeeds').subscribe(
      (response: any) => {

          console.log(response);
          
        response.body.forEach(element => {
          element['addedBy']=element.appuser.name;

          if(element.status=='0'){
            element['status']="InActive";
          }else  if(element.status=='1'){
            element['status']="Active";
          }  
          
        });






       // let userList =  response.body.filter(item=>item.user_type=="User");
        this.source.load(response.body);
      
     
      },
      (error) => {
  });    


  }



  onDelete(event): void {
    if (confirm('Are you sure to delete this user?')) {
      // this.http.delete(this.baseUrl + 'admin/user/' + event.data._id+"/delete")
      //   .subscribe(
      //     (response: any) => {
      //       if (response.message == 'User deleted successfully') {
      //            this.toast.showToast(NbToastStatus.SUCCESS, 'Users', response.message);
      //            this.getAllItems();
      //       }
      //   });
    }
  }
  onEdit(item, modelId){
       
  //      this.selectedUserId =item.data.id;
  //      this.selectedUserName = item.data.name;

  //      this.http.get(this.baseUrl + 'userGoupsList/'+item.data.id).subscribe(
  //       (userGroups: any) => {
  //       //  this.getAllGroups()
  //       this.allGroups.map(item=>{
  //         item.status=false;
  //       })
  //         console.log(userGroups);
  //        if(userGroups.body.length>0){
  //          userGroups.body.forEach(element => {
  //          let index = this.allGroups.findIndex(item=>item.id==element.groupId)
  //           if(index!=-1){
  //             //console.log("found")
  //             this.allGroups[index].status=true;
  //            }else{
  //             //console.log(" not found")
  //             this.allGroups[index].status=false;
  //            }
  //         });

  //        }
          

  //       },
  //       (error) => {
  //      });
       
  //   // this.selectedItems=item.data.groups;
  //    this._NgbModal.open(modelId, {
  //     windowClass: 'modal-job-scrollable'
  //  });
   



  }


}
