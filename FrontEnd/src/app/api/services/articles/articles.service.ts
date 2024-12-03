import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {



  private baseUrl = environment.CONNECTION_BACK + '/api/v1/articles/';
  private apiUrl = environment.CONNECTION_BACK + '/api/v1/categories/';
  private localStorageKey = 'categories';
  private _amuntProducts: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getArticles(filters?: any): Observable<any> {
    // Construir la URL con los filtros adicionales si se proporcionan
    let url = this.baseUrl;
    if (filters) {
      url += `?${this.serialize(filters)}`;
    }

    return this.http.get(url);
  }

  private serialize(obj: any): string {
    return Object.keys(obj).map(key =>
       `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
  }


  getArticlesByGender(gender: string): Observable<any> {
    const url = `${this.baseUrl}searchArticleByGender?gender=${gender.toUpperCase()}`;
    return this.http.get(url);
  }

  getArticleById(id: string){
    const url = `${this.baseUrl}${id}`;
    return this.http.get(url);
  }

  getCategories(): Observable<any> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    const url = environment.CONNECTION_BACK + '/api/v1/categories/';
    return this.http.get(url, { headers});
  }

  getCategoriesByGender(){

  }

  addArticle(articleData: any): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.post(this.baseUrl, articleData, { headers });
  }

  deleteArticle(id: string): Observable<any> {

    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const url = `${this.baseUrl}${id}`;

    return this.http.delete(url, { headers, responseType: 'text' });
  }

  updateArticle(id: string, articleData: any): Observable<any> {
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const url = `${this.baseUrl}${id}`;

    return this.http.put(url, articleData, { headers });
  }

  getArticlesByCategoryName(name :string): Observable<any> {
    const headers = new HttpHeaders();
    const url = `${this.baseUrl}${"searchArticleByCategoryName?category="+name}`;
    return this.http.get(url, { headers });
  }

  getArticlesByName(name :string): Observable<any> {
    const headers = new HttpHeaders();
    const url = `${this.baseUrl}${"search?name_article="+name}`;
    return this.http.get(url, { headers });
  }

  get amountCar() {
    return this._amuntProducts.asObservable();
  }

  getCard(){
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const card = JSON.parse(storedCart);
        this._amuntProducts.next(card.length);
        return card;
      } catch (error) {
        console.error('Error parsing cart items from localStorage:', error);
      }
    }else{
      return [];
    }
  }

  getAmount(){
    const amount = this.getCard().length;
    this._amuntProducts.next(amount);
    return amount;
  }


  addProductCard(productId:string|null,selectedSize:string,quantity:number){

    // Buscar el carrito en el localStorage
    let cartItems = this.getCard();

    // Verificar si el producto con la misma talla ya está en el carrito
    const itemIndex = this.productInCartIndex(
      productId, selectedSize , cartItems);

    if (itemIndex !== -1) {
      // Si el producto con la misma talla ya está en el carrito, actualizar la cantidad
      cartItems[itemIndex].quantity += quantity;
    } else {
      // Agregar el nuevo producto al carrito
      const newItem = {

        productId: productId,
        size: selectedSize,
        quantity: quantity
      };
      cartItems.push(newItem);
      this._amuntProducts.next(cartItems.length);
    }

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }

  private productInCartIndex(productId: string | null, size: string, cartItems: any[]): number {
    return cartItems.findIndex(
      (item: any) => item.productId === productId && item.size === size
    );
  }

  clearCart() {
    localStorage.removeItem('cart');
    this._amuntProducts.next(0);
  }

  setCard(cartItems: any){
    localStorage.setItem('cart', JSON.stringify(cartItems));
    this._amuntProducts.next(cartItems)
  }

}
