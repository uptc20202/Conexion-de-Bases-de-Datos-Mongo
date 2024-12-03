import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  apiUrl = environment.CONNECTION_BACK + '/api/v1';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getSales(): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/sales`, { headers });
  }

  getUserById(userId: string): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/users/${userId}`, { headers });
  }

   /**
   * Creates a new sale record on the server.
   *
   * This method sends a POST request to the specified URL to create a new sale
   * with the provided data. The request includes an authorization token in the
   * headers and expects a JSON response.
   *
   * @param {object} saleData - The data of the sale to be created. The structure
   * of the data should match the expected format:
   *  {
   *    "user_id": "string",
   *    "articles": [
   *      {
   *        "article_id": "string",
   *        "size": "string",
   *        "quantity": number
   *      },
   *      // Additional articles as needed
   *    ],
   *    "statusSale": "string"
   *  }
   * @returns {Observable<any>} - An observable containing the response from the server.
   */
  addSale(saleData: any): Observable<any> {
    console.log(saleData);
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/sales`, saleData, { headers });
  }

   /**
   * Obtains sales for a specific user from the server.
   *
   * This method sends a GET request to the specified URL to obtain sales
   * data for the user with the provided user ID. The request includes an
   * authorization token in the headers and expects a JSON response.
   *
   * @param {string} userId - The ID of the user for whom to retrieve sales data.
   * @returns {Observable<any>} - An observable containing the response from the server.
   */
   getSalesByUser(userId: string): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/sales/getSalesUser/${userId}`, { headers });
  }

  /**
   * Obtains a specific sale by its ID from the server.
   *
   * This method sends a GET request to the specified URL to obtain data for the sale
   * with the provided sale ID. The request includes an authorization token in the
   * headers and expects a JSON response.
   *
   * @param {string} saleId - The ID of the sale to retrieve.
   * @returns {Observable<any>} - An observable containing the response from the server.
   */
  getSaleById(saleId: string): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/sales/${saleId}`, { headers });
  }

  /**
   * Updates the status of a sale by its ID.
   *
   * This method sends a PUT request to update the status of the sale with the provided sale ID.
   * The request includes an authorization token in the headers and expects a JSON response.
   *
   * @param {string} saleId - The ID of the sale to update.
   * @param {object} statusData - The data containing the new status of the sale. The structure
   * of the data should match the expected format:
   *  {
   *    "statusSale": "COMPLETA" | "CANCELADA"
   *  }
   * @returns {Observable<any>} - An observable containing the response from the server.
   */
  updateSaleStatus(saleId: string, statusData: any): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    return this.http.put(`${this.apiUrl}/sales/${saleId}`, statusData, { headers });
  }

  reportByDay(){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}/sales/salesToDay`, { headers });
  }

  reportByMonth(){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}/sales/salesToMonth`, { headers });
  }

  reportByWeek(){
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.apiUrl}/sales/salesToWeek`, { headers });
  }

}
