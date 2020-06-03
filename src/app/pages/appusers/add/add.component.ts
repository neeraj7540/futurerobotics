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
  imagePath;
  fileData: File = null;
  eventForm: FormGroup;
  submitted = false;
  imgURL: any;
  message: string;
  citiesList:any;
  endMinDate = new Date();

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
      email:['', [Validators.required, Validators.email]],
      dob:['',Validators.required],
      about:  [''],
      location:[''],
      country : ['United States',Validators.required],
      password:  ['', [Validators.required, Validators.minLength(8)]],
      work:  [''],
      additional:  [''],
      image: ['',[Validators.required]],

     });
   

    this.getCountries()

  }

  
  getCountries(){

    this.getCountryList().subscribe(
      (response: any) => {
        console.log(response);
        this.citiesList = response;
       
     },
      (error) => {
        
      });
   
  
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    this.f['image'].setValue(files[0].name ? files[0].name : '');
    const reader = new FileReader();
    this.imagePath = files;
    this.fileData = <File>files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
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
    // this.formError=""
    const formData = new FormData();
    formData.append('name', this.f.name.value);
    formData.append('email', this.f.email.value);
    formData.append('country', this.f.country.value);
    formData.append('location', this.f.location.value);
    formData.append('about', this.f.about.value);
    formData.append('work', this.f.work.value);
    formData.append('additional', this.f.additional.value);
    formData.append('password', this.f.password.value);
    formData.append('image', this.fileData);
    alert("no error");
    this.spinner = false;
    //  this.http.post(this.baseUrl + 'admin/user/create', formData).subscribe(
    //   (response: any) => {

    //     console.log(response);
    //      this.spinner = false;
    //     if (response.message === 'Exists' || response.message === 'Error') {
    //       this.toast.showToast(NbToastStatus.DANGER, 'Error', response.body);
    //     } else if (response.message === 'User created successfully!') {
    //       this.toast.showToast(NbToastStatus.SUCCESS, 'User',response.message);
    //       this.form.nativeElement.reset();
          
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.spinner = false;
    //     if( error.error.body.email){
    //       this.toast.showToast(NbToastStatus.DANGER, 'Error', error.error.body.email.message);
    //     }else if(error.error.body.username){
    //       this.toast.showToast(NbToastStatus.DANGER, 'Error', error.error.body.username.message);
    //     }       
    //   });
  }




  getCountryList(){

  return this.http.get("./assets/countries.json");
}


}
