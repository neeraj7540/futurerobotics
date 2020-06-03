import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrMessages } from '../../helpers/toaster.service';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
@Component({
  styleUrls: ['./logout.component.scss'],
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {
  loginForm: FormGroup;
 
  constructor(
    private authService: AuthService,
    private router: Router,
   

  ) {
  }

  ngOnInit() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/auth']);
  }
}
