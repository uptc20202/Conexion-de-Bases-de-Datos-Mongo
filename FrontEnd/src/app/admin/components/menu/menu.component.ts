import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from 'src/app/api/services/articles/articles.service';
import { LoginService } from 'src/app/api/services/login/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  stadeRegisterPopup: boolean=false;
  stadeBackGroundPopup: boolean=false;
  stateLogin: boolean=false;
  stateCard: boolean=false;
  stadeSearch: boolean=false;

  seachConten: string="";

  admin:boolean=false;
  amountItemCard:number=0;

  nosotrosViewState:boolean = false;

  constructor(private router: Router, private loginService: LoginService,
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.validateRol();
    this.validateSecion(0);


    this.amountItemCard = this.articlesService.getAmount();
    this.articlesService.amountCar.subscribe(
      amount =>{
        this.amountItemCard =amount;
      }
    )

    this.route.paramMap.subscribe(params => {
      const searchParams = params.get('data');

      if(searchParams){
        this.seachConten=searchParams;
      }
    });

  }

  test(response:any){
    console.log(this.seachConten);
  }

  validateSecion(trys:number){
    this.loginService.validateToken().then((success) => {
      this.stateLogin =true;
      const userData = localStorage.getItem('user');
      if (userData) {
        this.validateRol();
      }
    },
      (error) => {
        if(trys>=3){
          this.stateLogin =false;
          this.loginService.logout();
          this.admin = false;
        }else{
          this.validateSecion(trys+1);
        }

      }
    );
  }

  logout(){
    this.stateLogin =false;
    this.showNoLoginOptions = false;
    this.admin = false;
    this.loginService.logout();
    this.homeRoute();
  }

  validateRol(){
    this.admin = this.loginService.validateRol();
  }

  showRegisterPopup() {
    this.showUserOptions = false;
    this.stadeRegisterPopup = true;
    this.stadeBackGroundPopup = true;
    this.stadeLoginPopup = false;
  }

  showUserOptions: boolean = false;
  showNoLoginOptions: boolean = false;

  onUserIconHover(): void {

    if(!this.stateLogin){
      this.showNoLoginOptions = true;
    }else{
      this.showNoLoginOptions = false;
    }

    this.showUserOptions = true;

  }

  onUserOptionsHover(): void {
    this.showUserOptions = true;
  }

  onUserOptionsLeave(): void {
    this.showUserOptions = false;
  }

  stadeLoginPopup: boolean = false;

  showLoginPopup() {
    this.showUserOptions = false;
    this.stadeLoginPopup = true;
    this.stadeBackGroundPopup = true;
    this.stadeRegisterPopup = false;
  }

  noStadeLoginPopup(){
    this.stadeBackGroundPopup = false;
    this.stadeLoginPopup = false;
    this.stadeRegisterPopup =false;
  }

  // Método para redirigir al usuario a la ruta \register
  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  homeRoute() {
    this.router.navigate(['/']);
  }

  profileRoute(){
    this.router.navigate(['/profile']);
  }

  productsRoute(gender: string): void {
    this.router.navigate(['/catalogue/'+gender]);
  }

  routerNavigate(path:string){
    console.log(path)
    this.router.navigate([path]);
  }

  productsAdminRoute(){
    this.router.navigate(['/admin/products']);
  }

  reportSellRoute() {
    this.router.navigate(['admin/sales-report']);
  }

}
