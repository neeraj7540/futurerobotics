import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient,

  ) { }
////// ================================ Category service ======================================== //////
  categories() {
    return this.http.get(this.baseUrl + 'categories');
  }
}
