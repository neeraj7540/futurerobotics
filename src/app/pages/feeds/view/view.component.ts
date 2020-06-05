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

      id:{
        title: 'Id',
        type: 'string'
      },

      email:{
        title: 'Email',
        type: 'string'
      },
      name: {
        title: 'Name',
        type: 'string',
      },

      city: {
        title: 'City',
        type: 'string',
      },

      phone: {
        title: 'Phone',
        type: 'string',
      },

      user_group:{
        title: 'User group',
        type: 'string',

      },

       profile_image: {
        title: 'Image',
        type: 'html',
        filter: false,
        valuePrepareFunction: (profile_image: string) => `<img width="30px" src="${this.imagesUrl}${profile_image}" />`,
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
  this.getAllItems();
   
  }


  getAllItems(){

    this.http.get(this.baseUrl + 'api/allfeeds').subscribe(
      (response: any) => {

          console.log(response);
          
        // response.body.forEach(element => {
        //   if(element['user_group']=="1"){

        //     element['user_group']="Free user";

        //   }else if(element['user_group']=="2"){
        //     element['user_group']="Active Premium user";
        //   }
        //   else if(element['user_group']=="3"){
        //     element['user_group']="Previous premium user";
        //   }

        //   element['id'] = parseInt(element._id.substring(0, 8), 16)
          
        // });



       // let userList =  response.body.filter(item=>item.user_type=="User");
        //this.source.load(userList);
      
     
      },
      (error) => {
  });    


  }



  onDelete(event): void {
    if (confirm('Are you sure to delete this user?')) {
      this.http.delete(this.baseUrl + 'admin/user/' + event.data._id+"/delete")
        .subscribe(
          (response: any) => {
            if (response.message == 'User deleted successfully') {
                 this.toast.showToast(NbToastStatus.SUCCESS, 'Users', response.message);
                 this.getAllItems();
            }
        });
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
