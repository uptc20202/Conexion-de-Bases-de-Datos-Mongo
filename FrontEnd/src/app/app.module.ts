import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePagesComponent } from './pages/home.pages/home.pages.component';
import { MenuComponent } from './admin/components/menu/menu.component';
import { AdsTopComponent } from './admin/components/ads-top/ads-top.component';
import { CarouselComponent } from './admin/components/carousel/carousel.component';
import { CCarouselComponent } from './admin/components/c-carousel/c-carousel.component';
import { AreasComponent } from './admin/components/areas/areas.component';
import { TargetaAreasComponent } from './admin/components/targeta-areas/targeta-areas.component';
import { LoginPopUpComponent } from './admin/components/login-pop-up/login-pop-up.component';
import { RegisterPagesComponent } from './pages/register.pages/register.pages.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProfilePagesComponent } from './pages/profile.pages/profile.pages.component';
import { ProfileComponent } from './admin/components/profile/profile.component';
import { CataloguePagesComponent } from './pages/catalogue.pages/catalogue.pages.component';
import { ProductCatalogueComponent } from './admin/components/product-catalogue/product-catalogue.component';
import { PopMessageComponent } from './admin/components/pop-message/pop-message.component';
import { DetailProductPagesComponent } from './pages/detail-product.pages/detail-product.pages.component';
import { ProductDescriptionComponent } from './admin/components/product-description/product-description.component';
import { CreateProductPagesComponent } from './pages/create-product.pages/create-product.pages.component';
import { AddProductComponent } from './admin/components/add-product/add-product.component';
import { ReadProductAdminComponent } from './admin/components/read-product-admin/read-product-admin.component';
import { ListFilterPipe } from './pipe/list-filter.pipe';
import { CategoryListComponent } from './admin/components/category-list/category-list.component';
import { SalesPagesComponent } from './pages/sales.pages/sales.pages.component';
import { ShopCarComponent } from './admin/components/shop-car/shop-car.component';
import { SalesReportComponent } from './admin/components/sales-report/sales-report.component';
import { Step2BuyComponent } from './admin/components/step2-buy/step2-buy.component';
import { ContinueBuyPagesComponent } from './pages/continue-buy.pages/continue-buy.pages.component';
import { AddressPagesComponent } from './pages/address.pages/address.pages.component';
import { AddressComponent } from './admin/components/address/address.component';
import { CircleStateShippingComponent } from './admin/components/circle-state-shipping/circle-state-shipping.component';
import { MapsPagesComponent } from './pages/maps.pages/maps.pages.component';
import { MapsComponent } from './admin/components/maps/maps.component';
import { EditAddresComponent } from './admin/components/edit-addres/edit-addres.component';
import { MatOption } from '@angular/material/core';
import { Step3BuyComponent } from './admin/components/step3-buy/step3-buy.component';
import { SalesOrdersComponent } from './admin/components/sales-orders/sales-orders.component';
import { UserDetailComponent } from './admin/components/sales/user-detail/user-detail.component';
import { EditCategoryComponent } from './admin/components/edit-category/edit-category.component';
import { SaleStatusPagesComponent } from './pages/sale-status.pages/sale-status.pages.component';
import { JobsUserComponent } from './admin/components/jobs-user/jobs-user.component';
import { JobsUserListPagesComponent } from './pages/jobs-user-list.pages/jobs-user-list.pages.component';
import { JobsUserDetailsPagesComponent } from './pages/jobs-user-details.pages/jobs-user-details.pages.component';
import { JobsUserDetailComponent } from './admin/components/jobs-user-detail/jobs-user-detail.component';
import { JobsAdminListComponent } from './admin/components/jobs-admin-list/jobs-admin-list.component';
import { JobsAdminListPagesComponent } from './pages/jobs-admin-list.pages/jobs-admin-list.pages.component';
import { FilterJobsPipe } from './pipe/filter-jobs.pipe';
import { FilterPipe } from './filter.pipe';
import { CreateJobComponent } from './admin/components/create-job/create-job.component';
import { ApplyOfferComponent } from './admin/components/apply-offer/apply-offer.component';
import { ApplyOfferPagesComponent } from './pages/apply-offer.pages/apply-offer.pages.component';
import { BannerAccesoriosComponent } from './admin/components/banner-accesorios/banner-accesorios.component';
import { FootterPageComponent } from './admin/components/footter-page/footter-page.component';
import { ReportsAdminComponent } from './admin/components/reports-admin/reports-admin.component';
import { ReportAdminPagesComponent } from './pages/report-admin.pages/report-admin.pages.component';
import { BulkPurchaseComponent } from './admin/components/bulk-purchase/bulk-purchase.component';
import { StoresAdminPagesComponent } from './pages/stores-admin.pages/stores-admin.pages.component';
import { StoresAdminComponent } from './admin/components/stores-admin/stores-admin.component';
import { StoresComponent } from './admin/components/stores/stores.component';
import { EditStoresComponent } from './admin/components/edit-stores/edit-stores.component';
import { StoreViewUserComponent } from './admin/components/store-view-user/store-view-user.component';
import { InfoCompanyComponent } from './admin/components/info-company/info-company.component';
import { UpdatePassComponent } from './admin/components/update-pass/update-pass.component';
import { ForgotPassComponent } from './admin/components/forgot-pass/forgot-pass.component';
import { FinishBuyNoLoginComponent } from './admin/components/finish-buy-no-login/finish-buy-no-login.component';
import { RecoberypassComponent } from './admin/components/recoberypass/recoberypass.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePagesComponent,
    MenuComponent,
    AdsTopComponent,
    CarouselComponent,
    CCarouselComponent,
    AreasComponent,
    TargetaAreasComponent,
    LoginPopUpComponent,
    RegisterPagesComponent,
    ProfilePagesComponent,
    ProfileComponent,
    CataloguePagesComponent,
    ProductCatalogueComponent,
    PopMessageComponent,
    DetailProductPagesComponent,
    ProductDescriptionComponent,
    CreateProductPagesComponent,
    AddProductComponent,
    ReadProductAdminComponent,
    ListFilterPipe,
    CategoryListComponent,
    SalesPagesComponent,
    ShopCarComponent,
    SalesReportComponent,
    Step2BuyComponent,
    ContinueBuyPagesComponent,
    AddressPagesComponent,
    AddressComponent,
    CircleStateShippingComponent,
    MapsPagesComponent,
    MapsComponent,
    EditAddresComponent,
    Step3BuyComponent,
    SalesOrdersComponent,
    UserDetailComponent,
    EditCategoryComponent,
    SaleStatusPagesComponent,
    JobsUserComponent,
    JobsUserListPagesComponent,
    JobsUserDetailsPagesComponent,
    JobsUserDetailComponent,
    JobsAdminListComponent,
    JobsAdminListPagesComponent,
    FilterJobsPipe,
    FilterPipe,
    CreateJobComponent,
    ApplyOfferComponent,
    ApplyOfferPagesComponent,
    BannerAccesoriosComponent,
    FootterPageComponent,
    ReportsAdminComponent,
    ReportAdminPagesComponent,
    BulkPurchaseComponent,
    StoresAdminPagesComponent,
    StoresAdminComponent,
    StoresComponent,
    EditStoresComponent,
    StoreViewUserComponent,
    InfoCompanyComponent,
    UpdatePassComponent,
    ForgotPassComponent,
    FinishBuyNoLoginComponent,
    RecoberypassComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
