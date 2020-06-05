import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-status-card',
  styleUrls: ['./status-card.component.scss'],
  template: `
    <nb-card (click)="redirectToPage()">
      <div class="icon-container">
        <div class="icon {{ type }}">
          <ng-content></ng-content>
        </div>
      </div>

      <div class="details">
        <div class="title">{{ title }}</div>
        <h5>{{items}}</h5>
      
      </div>
    </nb-card>
  `,
})
export class StatusCardComponent {

  @Input() title: string;
  @Input() type: string;
  @Input() link: string;
  @Input() on = true;
  @Input() items: number;

  constructor(private router:Router){

  }

  redirectToPage(){

    this.router.navigateByUrl(this.link);
  }
}
