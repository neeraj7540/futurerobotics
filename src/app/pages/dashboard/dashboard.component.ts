import {Component, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  link:string,
  items:number
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;

  solarValue: number;
  baseUrl = environment.baseUrl;
  imagesUrl = environment.imagesUrl;

  lightCard: CardSettings = {
    title: 'Users',
    iconClass: 'nb-person',
    type: 'primary',
    link:'/pages/appusers/view',
    items:0
   
  };
  rollerShadesCard: CardSettings = {
    title: 'Groups',
    iconClass: 'nb-keypad',
    type: 'success',
    link:'/pages/groups/view',
    items:0
  };
  wirelessAudioCard: CardSettings = {
    title: 'Posts',
    iconClass: 'nb-email',
    type: 'info',
    link:'/pages/feeds/view',
    items:0
  };
  coffeeMakerCard: CardSettings = {
    title: 'Reported Post',
    iconClass: 'nb-alert',
    type: 'warning',
    link:'/pages/reportedfeeds/view',
    items:0

  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'secondary',
      },
    ],
  };

  constructor(private themeService: NbThemeService,
    private http: HttpClient,
              private solarService: SolarData) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });

      this.getDashboardData();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getDashboardData(){
    this.http.get(this.baseUrl + 'api/dashboarddata').subscribe(
      (response: any) => {
      
        this.lightCard.items=response.body.totalUsers;
        this.rollerShadesCard.items = response.body.totalGroups;
        this.wirelessAudioCard.items = response.body.totalPost;
        this.coffeeMakerCard.items = response.body.totalReport;
      
        console.log(response);
        
      },
      (error) => {
  });    

  }

}
