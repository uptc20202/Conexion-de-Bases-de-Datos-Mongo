import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'https://www.datos.gov.co/resource/xdk5-pm3f.json';
  private apiUserUrl = environment.CONNECTION_BACK + '/api/v1/users';

  private _addresses: BehaviorSubject<[]> = new BehaviorSubject<[]>([]);

  constructor(private http: HttpClient, private cookieService: CookieService,
     private loginService:LoginService) {}

  get addresses(){
    return this._addresses.asObservable();
  }

  getAllDepartamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getMunicipiosByDepartamento(departamento: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?departamento=${departamento}`);
  }

  createAddress(userId: string, addressData: any): Observable<any> {
    const url = `${this.apiUserUrl}/createAddress/${userId}`;
    return this.http.put<any>(url, addressData);
  }

  updateAddress(userId: string, addressData: any): Observable<any> {

    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.apiUserUrl}/updateAddress/${userId}`;

    return this.http.put<any>(url, addressData,  { headers });
  }

  /**
   * Deletes an existing address for a user.
   * @param id_address - The ID of the address to be deleted.
   * @returns An Observable of the delete operation result.
   */
  deleteAddress(temporal: string, idAddress: string): Observable<any> {
    const id_user = this.loginService.getUserStorage()._id;

    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.apiUserUrl}/deleteAddress/${id_user}`;

    const body = {
      id_address: idAddress
    };
    return this.http.put<any>(url, body, { headers });
  }


  deleteAddressStorage(idAddress: string){
    let user = this.loginService.getUserStorage();
    let addresses = user.shiping_address;

    addresses = addresses.filter((address:any )=> address._id != idAddress)

    user.shiping_address = addresses;

    this.loginService.saveUserStorage(user);

    this._addresses.next(addresses);
  }

  addAddressStorage(address: any){
    let user = this.loginService.getUserStorage();
    let addresses = user.shiping_address;
    addresses.push(address);

    user.shiping_address = addresses;

    this.loginService.saveUserStorage(user);

    this._addresses.next(addresses);
  }

  setObservableAddresses(addAddress:any){
    this._addresses.next(addAddress);
  }

  getAddressesStorage(){
    const addresses =  this.loginService.getUserStorage().shiping_address;
    this._addresses.next(addresses);
    return addresses;
  }
}
