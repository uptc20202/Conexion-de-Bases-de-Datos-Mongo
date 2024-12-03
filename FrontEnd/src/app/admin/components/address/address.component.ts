import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddressService } from 'src/app/api/services/address/address.service';
import { LoginService } from 'src/app/api/services/login/login.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent   implements OnInit {

  @Output() editBtn: EventEmitter<boolean> = new EventEmitter<boolean>();
  addressEdit: any;

  address_edit: boolean = false;
  addresses: any[] = [];
  userId: string = '';

  constructor(private loginService:LoginService,private addressService:AddressService) { }

  ngOnInit(): void {
    // Recuperar las direcciones del localStorage bajo la clave "user"
    this.userId = this.loginService.getUserStorage()?._id;
    this.loadAddress();
  }

  loadAddress(){
    this.addresses = this.addressService.getAddressesStorage();
    this.addressService.addresses.subscribe(
      addresses => this.addresses = addresses
    );
  }

  goBack(): void {
    // Lógica para volver atrás
    // Puedes implementar redirecciones o acciones específicas aquí
    console.log('Volver');
  }

  addAddress(): void {
    // Lógica para agregar una nueva dirección
    this.editBtn.emit(true);
    this.addressEdit;
  }

  editAddress(address: any): void {
    // Lógica para editar una dirección específica
    this.address_edit = true;
    this.addressEdit = address;
  }

  /**
   * Updates the list of addresses when an address is deleted.
   * @param addressId The ID of the deleted address.
   */
  onAddressDeleted(addressId: string): void {
    this.addresses = this.addresses.filter(address => address._id !== addressId);
  }

}
