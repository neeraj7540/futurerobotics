import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
// import { Location } from '../../maps/search-map/entity/Location';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NbDateService } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToastrMessages } from '../../../helpers/toaster.service';
import { MENU_ITEMS } from '../../pages-menu';

import { element } from '@angular/core/src/render3';
@Component({
  selector: 'ngx-adsAdd',
  styleUrls: ['./add.component.scss'],
  templateUrl: './add.component.html',
})
export class AddComponent implements OnInit {


  @Output() positionChanged = new EventEmitter<Location>();
  @ViewChild('search')
  public search: ElementRef;
  time: any;
  tcode: string;
  menu: any;
  selected: any;
  validEmail: boolean;
  emailError:any;
  UNameError="";
  phoneError=""
  formError: string;
  result: string;
  dropdownList = [];
  selectedItems:any;

  constructor(
    private formBuilder: FormBuilder,
    private dateService: NbDateService<Date>,
    private http: HttpClient,
    private toast: ToastrMessages,
    
  ) {
  }
  baseUrl = environment.baseUrl;

  spinner = false;
  eventForm: FormGroup;
  submitted = false;
  message: string;

  @ViewChild('form') form;
  ngOnInit() {
    this.emailError='';
  var data=[];
  for(let i=0;i < MENU_ITEMS.length; i++){
    if(i==0){

    }
    else if(i==1){

    }
    else if(i==2){

    }
    else{
        data.push(MENU_ITEMS[i])
    }
  }
    
    this.menu=data;
    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description:['', [Validators.required, Validators.minLength(4)]],

     });
   
  }

  
 


  // convenience getter for easy access to form fields
  get f() { return this.eventForm.controls; }
  ////// ========================== super admin login function =========================== //////





  addEvent() {
    this.submitted = true;
    if (this.eventForm.invalid) {
      return;
    }

    // --------------------------------------------------------------          
    this.spinner = true;
    // const formData = new FormData();
    // formData.append('name', this.f.name.value);
    // formData.append('description', this.f.description.value);

   let  formData = {
    name:this.f.name.value,
    description:this.f.description.value
    
   }


  
    this.spinner = false;
     this.http.post(this.baseUrl + 'api/addfeedscategory', formData).subscribe(
      (response: any) => {

        console.log(response);
         this.spinner = false;
        if (response.message === 'Feeds Category Added Successfully!') {
          this.toast.showToast(NbToastStatus.SUCCESS, 'Feeds Category',response.message);
          this.form.nativeElement.reset();
          this.submitted = false;
          
        }
      },
      (error) => {
          this.toast.showToast(NbToastStatus.DANGER, 'Error', error.error.message);
          
      });
  }







}
