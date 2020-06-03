import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToastrMessages } from '../../../helpers/toaster.service';

import { NbToastStatus } from '@nebular/theme/components/toastr/model';
@Component({
  selector: 'ngx-view',
  templateUrl: './view.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ViewComponent {
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;
  settings = {
    mode: 'external',
    actions: {
      position: 'right', // left|right
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
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      image: {
        title: 'Image',
        type: 'html',
        filter: false,
        valuePrepareFunction: (image: string) => `<img width="30px" src="${this.imagesUrl}${image}" />`,
        // injecting html into Smart table
      },
      phone: {
        title: 'Phone',
        type: 'string',
      },
      fax: {
        title: 'Fax',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
    },

  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrMessages,
    private datePipe: DatePipe,
  ) {
    ////// ==================== get list of all Profiles ==================== //////
    this.http.get(this.baseUrl + 'getProfiles').subscribe(
      (response: any) => {
        this.source.load(response.body);
      },
      (error) => {
      });
  }
  // confirm box
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onEdit(event): void {
    this.router.navigate(['pages/profiles/edit/' + event.data.id]);
  }

  ////// ====================== delete Profile ================================= //////
  onDelete(event): void {
    if (confirm('Are you sure to delete this Profile?')) {
      this.http.delete(this.baseUrl + 'profile/' + event.data.id)
        .subscribe(
          (response: any) => {
            this.http.get(this.baseUrl + 'getProfiles').subscribe(
              (newresponse: any) => {
                if (response.message == 'Deleted') {
                  this.toast.showToast(NbToastStatus.SUCCESS, 'Profile', response.body);
                }
                this.source.load(newresponse.body);
              },
              (error) => {
              });
          });
    }
  }
}
