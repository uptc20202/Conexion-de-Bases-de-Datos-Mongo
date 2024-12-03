import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { text } from '@cloudinary/url-gen/qualifiers/source';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  urlApi = "https://freya-backend.onrender.com/api/v1/stores/"

  private _stores: BehaviorSubject<[]>= new BehaviorSubject<[]>([]);

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  get stores(){
    return this._stores.asObservable();
  }

  setStoresObservable(stores:[]){
    this._stores.next(stores);
  }



  deteleStore(id:string){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

      return this.http.delete(`${this.urlApi}${id}`, { headers, responseType: 'text' });
  }

  createStore(store:any){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

      return this.http.post(this.urlApi, store,{ headers });
  }

  updateStore(store:any){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)

      return this.http.put(`${this.urlApi}/${store._id}`, store, { headers });
  }

  getStores(){
    const headers = new HttpHeaders();
    return this.http.get<any>(this.urlApi, { headers });
  }

  getStoreById(id:string){
    //const token = this.cookieService.get('token');
    const headers = new HttpHeaders()
      //.set('Authorization', `Bearer ${token}`)

      return this.http.get(`${this.urlApi}${id}`, { headers });
  }
}
