import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-message',
  templateUrl: './pop-message.component.html',
  styleUrls: ['./pop-message.component.scss']
})
export class PopMessageComponent implements OnInit{

  @Input() showSuccessMessage: boolean = false;
  @Input() message: string = "";
  @Input() typeOfAlert: string = "error";
  link: string = "../../../assets/popMessage/error.png";
  borderColor: any;
  textColor: any;

  ngOnInit(): void {
    // Ocultar el mensaje después de un cierto período de tiempo (por ejemplo, 3 segundos)
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);

  }

  update(){
    switch(this.typeOfAlert){
      case 'error':
        this.borderColor = "#F8C1C0";
        this.textColor = "#F45B69";
        this.link = "../../../assets/popMessage/error.png"
        break;
      case 'check':
        this.borderColor = "#C0F8E3";
        this.textColor = "#000000";
        this.link = "../../../assets/popMessage/check.png"
        break;
    }
  }



}
