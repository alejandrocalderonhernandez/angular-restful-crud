import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public profile: string;

  constructor() {
    this.profile = 'https://github.com/alejandrocalderonhernandez';
   }

  ngOnInit(): void {
  }

}
