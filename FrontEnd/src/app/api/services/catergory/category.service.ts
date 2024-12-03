import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = environment.CONNECTION_BACK + '/api/v1/categories';

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  /**
   * Retrieves a category by its ID.
   *
   * This method sends a GET request to the backend API to retrieve a category by its ID.
   * The request includes an authorization token obtained from the cookie service.
   *
   * @param {string} categoryId - The ID of the category to retrieve.
   * @returns {Observable<any>} An Observable containing the category data.
   */
  getCategoryById(categoryId: string): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${categoryId}`;
    return this.http.get<any>(url, { headers });
  }

  /**
   * Creates a new category.
   *
   * This method sends a POST request to the backend API to create a new category.
   * The request includes an authorization token obtained from the cookie service.
   *
   * @param {Category} category - The category data to be created.
   * @returns {Observable<Category>} An Observable containing the created category data.
   */
  createCategory(category: any): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(category);
    return this.http.post<any>(this.baseUrl, category, { headers });
  }

  /**
   * Updates an existing category.
   *
   * This method sends a PUT request to the backend API to update an existing category.
   * The request includes an authorization token obtained from the cookie service.
   *
   * @param {string} categoryId - The ID of the category to update.
   * @param {Partial<Category>} category - The category data to update.
   * @returns {Observable<Category>} An Observable containing the updated category data.
   */
  updateCategory(categoryId: string, category: any): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${categoryId}`;
    return this.http.put<any>(url, category, { headers });
  }

    /**
   * Deletes a category by its ID.
   *
   * This method sends a DELETE request to the backend API to delete a category by its ID.
   * The request includes an authorization token obtained from the cookie service.
   *
   * @param {string} categoryId - The ID of the category to delete.
   * @returns {Observable<any>} An Observable indicating the result of the delete operation.
   */
  deleteCategory(categoryId: string): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/${categoryId}`;
    return this.http.delete<any>(url, { headers });
  }

  getCategories(): Observable<any> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.get(this.baseUrl, { headers});
  }

  getCategorySizeGuide(id:string){
    this.getCategoryById(id)
  }
}
