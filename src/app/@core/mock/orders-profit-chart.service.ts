import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OrdersChart, OrdersChartData } from '../data/orders-chart';
import { OrderProfitChartSummary, OrdersProfitChartData } from '../data/orders-profit-chart';
import { ProfitChart, ProfitChartData } from '../data/profit-chart';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class OrdersProfitChartService extends OrdersProfitChartData {

  private summary = [
    {
      title: 'Events',
      value: 0,
    },
    {
      title: 'Festivities',
      value: 0,
    },
    {
      title: 'Sponsers',
      value: 0,
    },
    {
      title: 'Deaths',
      value: 0,
    },
  ];

  constructor(private ordersChartService: OrdersChartData,
              private profitChartService: ProfitChartData,private http: HttpClient) {
    super();
  }

  getOrderProfitChartSummary(): Observable<OrderProfitChartSummary[]> {
    return observableOf(this.summary);
  }

  getOrdersChartData(period: string): Observable<OrdersChart> {
    return observableOf(this.ordersChartService.getOrdersChartData(period));
  }

  getProfitChartData(period: string): Observable<ProfitChart> {
    return observableOf(this.profitChartService.getProfitChartData(period));
  }

  // this.http.get(this.baseUrl + 'todaynews').subscribe(
  //   (response: any) => {
  //     console.log("inservice")
  //     this.news=response.body.count;
  //   })
}
