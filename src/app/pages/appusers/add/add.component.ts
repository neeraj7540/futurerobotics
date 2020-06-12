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
      hireAvailable:['1'],
      about:  [''],
      location:[''],
      occupation:[],
      company:[''],
      experience:[''],
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
    
    formData.append('hireAvailable', this.f.hireAvailable.value);
    formData.append('occupation', this.f.occupation.value);
    formData.append('company', this.f.company.value);
    formData.append('experience', this.f.experience.value);

    formData.append('dob', this.f.dob.value);
    formData.append('work', this.f.work.value);
    formData.append('image', this.fileData);
    formData.append('additional', this.f.additional.value);
    formData.append('password', this.f.password.value);
    formData.append('deviceType', '0');
    formData.append('deviceToken', 'deviceToken');
    
   
    
   
    this.spinner = false;
     this.http.post(this.baseUrl + 'api/adduser', formData).subscribe(
      (response: any) => {

         this.spinner = false;
         this.submitted = false;
        if (response.message === 'Exists' || response.message === 'Error') {
          this.toast.showToast(NbToastStatus.DANGER, 'Error', response.body);
        } else if (response.message === 'Users Added Successfully!') {
          this.toast.showToast(NbToastStatus.SUCCESS, 'User',response.message);
          this.form.nativeElement.reset();
          this.imgURL = "";
          this.fileData=null;
          
        }
      },
      (error) => {
        console.log(error);
       
          this.toast.showToast(NbToastStatus.DANGER, 'Error', error.message);
              
      });
  }




  getCountryList(){

  return this.http.get("./assets/countries.json");
}


}
