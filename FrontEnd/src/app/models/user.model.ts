export class User {

  _id: string;
  name_user: string;
  email: string;
  password: string;
  status_user: boolean;
  role: string;
  first_name: string;
  birth_day: Date;
  gender: string;
  number_document: string;
  number_phone: string;
  second_name: string;
  type_document: string;

  constructor(user: any){
    this._id = user._id;
    this.name_user = user.name_user;
    this.email = user.email;
    this.password = user.password;
    this.status_user = user.status_user;
    this.role = user.role;
    this.first_name = user.first_name;
    this.birth_day = user.birth_day;
    this.gender = user.gender;
    this.number_document = user.number_document;
    this.number_phone = user.number_phone;
    this.second_name = user.second_name;
    this.type_document = user.type_document;
  }

  updateFields(user: any): void {
    this.first_name = user.first_name;
    this.birth_day = user.birth_day;
    this.gender = user.gender;
    this.number_document = user.number_document;
    this.number_phone = user.number_phone;
    this.second_name = user.second_name;
  }

}
