import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePagesComponent } from './pages/home.pages/home.pages.component';
import { RegisterPagesComponent } from './pages/register.pages/register.pages.component';
import { ProfilePagesComponent } from './pages/profile.pages/profile.pages.component';
import { CataloguePagesComponent } from './pages/catalogue.pages/catalogue.pages.component';
import { DetailProductPagesComponent } from './pages/detail-product.pages/detail-product.pages.component';
import { CreateProductPagesComponent } from './pages/create-product.pages/create-product.pages.component';
import { ShopCarComponent } from './admin/components/shop-car/shop-car.component';
import { SalesPagesComponent } from './pages/sales.pages/sales.pages.component';
import { ContinueBuyPagesComponent } from './pages/continue-buy.pages/continue-buy.pages.component';
import { MapsPagesComponent } from './pages/maps.pages/maps.pages.component';
import { SalesOrdersComponent } from './admin/components/sales-orders/sales-orders.component';
import { UserDetailComponent } from './admin/components/sales/user-detail/user-detail.component';
import { SaleStatusPagesComponent } from './pages/sale-status.pages/sale-status.pages.component';
import { JobsUserListPagesComponent } from './pages/jobs-user-list.pages/jobs-user-list.pages.component';
import { JobsUserDetailsPagesComponent } from './pages/jobs-user-details.pages/jobs-user-details.pages.component';
import { JobsAdminListPagesComponent } from './pages/jobs-admin-list.pages/jobs-admin-list.pages.component';
import { ApplyOfferComponent } from './admin/components/apply-offer/apply-offer.component';
import { ApplyOfferPagesComponent } from './pages/apply-offer.pages/apply-offer.pages.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin/admin.guard';
import { ReportAdminPagesComponent } from './pages/report-admin.pages/report-admin.pages.component';
import { BulkPurchaseComponent } from './admin/components/bulk-purchase/bulk-purchase.component';
import { MenuComponent } from './admin/components/menu/menu.component';
import { StoresAdminComponent } from './admin/components/stores-admin/stores-admin.component';
import { StoresAdminPagesComponent } from './pages/stores-admin.pages/stores-admin.pages.component';
import { StoreViewUserComponent } from './admin/components/store-view-user/store-view-user.component';
import { InfoCompanyComponent } from './admin/components/info-company/info-company.component';
import { UpdatePassComponent } from './admin/components/update-pass/update-pass.component';
import { ForgotPassComponent } from './admin/components/forgot-pass/forgot-pass.component';
import { FinishBuyNoLoginComponent } from './admin/components/finish-buy-no-login/finish-buy-no-login.component';
import { RecoberypassComponent } from './admin/components/recoberypass/recoberypass.component';

const routes: Routes = [
  {
    path: '',
    component:HomePagesComponent
  },
  {
    path: 'register',
    component:RegisterPagesComponent
  },
  {
    path: 'profile',
    canMatch: [AuthGuard],
    component:ProfilePagesComponent
  },
  {
    path: 'catalogue',
    component:CataloguePagesComponent
  },
  {
    path: 'catalogue/:gender',
    component:CataloguePagesComponent
  },
  {
    path: 'catalogue/byCategory/:category',
    component:CataloguePagesComponent
  },
  {
    path: 'catalogue/product/:id',
    component:DetailProductPagesComponent
  },
  {
    path: 'admin/products',
    canMatch: [AuthGuard, AdminGuard],
    component:CreateProductPagesComponent
  },
  {
    path: 'admin/sales-report',
    canMatch: [AuthGuard, AdminGuard],
    component:SalesPagesComponent
  },
  {
    path: 'cart',
    component:ContinueBuyPagesComponent
  },
  {
    path: 'stores',
    component:MapsPagesComponent
  },
  {
    path: 'sale/:id',
    canMatch: [AuthGuard],
    component:SaleStatusPagesComponent
  },
  {
    path: 'jobs',
    component:JobsUserListPagesComponent
  },
  {
    path: 'jobs/:id',
    component:JobsUserDetailsPagesComponent
  },
  {
    path: 'jobs/:id/apply',
    component:ApplyOfferPagesComponent
  },
  {
    path: 'admin/jobs',
    canMatch: [AuthGuard, AdminGuard],
    component:JobsAdminListPagesComponent
  },
  {
    path: 'admin/report',
    canMatch: [AuthGuard, AdminGuard],
    component:ReportAdminPagesComponent
  },
  {
    path: 'admin/stores',
    canMatch: [AuthGuard, AdminGuard],
    component:StoresAdminComponent
  },
  {
    path: 'orders',
    canMatch: [AuthGuard],
    component:SalesOrdersComponent
  },
  {
    path: 'catalogue/search/:data',
    component:CataloguePagesComponent
  },
  {
    path: 'stores/:idStore',
    component:StoreViewUserComponent
  },
  {
    path: 'who-are-we',
    component:InfoCompanyComponent
  },
  {
    path: 'forgot-password',
    component:ForgotPassComponent
  },
  {
    path: 'nologin/sale/:idsale',
    component:FinishBuyNoLoginComponent
  },{
    path: 'forgot-password',
    component:RecoberypassComponent
  },
  {
    path: 'test',
    component:RecoberypassComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
