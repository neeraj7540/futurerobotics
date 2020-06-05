import { map } from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter ,ViewChild,ElementRef} from '@angular/core';
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
  currentSelection="";
  likeCommentList:any;

  selectedUserId:any;

  selectedUserName="";
  settings = {
    mode: 'external',
    actions: {
      columnTitle:"",
      position: 'right', // left|right
      edit:true,
      add:false,
      delete:false,
    },

    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },

    edit: {
      editButtonContent: '<i class="nb-arrow-right"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {     
      deleteButtonContent: '<i class="nb-arrow-right"></i>',
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
        title: 'Description',
        type: 'string'
      },

      addedBy:{
        title: 'Added by',
        type: 'string'
      },

      status: {
        title: 'status',
        type: 'string',
       
      },
      
      likes: {
        title: 'Likes',
        type: 'custom',
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          });
        }
      },
      
      comments: {
        title: 'Comments',
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
  @ViewChild('groupsModel') modalExample: ElementRef



  constructor( 
    private http: HttpClient,
    private router: Router,
    private toast: ToastrMessages,
    private modalService: NgbModal,
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

          element['likes']="Likes";
          element['comments']="Comments";
          
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
    
  }

  viewDetails(type,data){
    console.log(type);
 
   
    this.modalService.open(this.modalExample,{ size: 'lg', backdrop: 'static' });
    if(type=="Likes"){
      this.currentSelection = "Like/Deslike"

      this.getAllLikes(data.id);

    }else{

      this.currentSelection = "Comments"

      this.getAllComments(data.id);

    }

   
  }

  getAllLikes(id){

    this.http.get(this.baseUrl +'api/allikes/'+id).subscribe(
      (response: any) => {
          
       this.likeCommentList  = response.body;
      },
      (error) => {
  });    
  }


  getAllComments(id){

    this.http.get(this.baseUrl + 'api/allcomments/'+id).subscribe(
      (response: any) => {
       console.log(response);
       this.likeCommentList  = response.body;
     
      },
      (error) => {
  });  


  }



}




@Component({
  selector: 'button-view',
  template: `
  <button (click)="onClick()">{{value}}</button>
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
     
      this.renderValue = this.value.toString()
  }

  onClick() {
   this.vewcomp.viewDetails(this.renderValue,this.rowData);
  }
}