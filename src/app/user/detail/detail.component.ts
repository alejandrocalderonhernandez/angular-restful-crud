import { UserDetailsService } from './../shared/services/user-details.service';
import { ResponseDetail } from './../shared/models/response-detail.model';
import { IconDefinition, faEnvelope, faCode, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public userDetail: ResponseDetail;

  public emailIcon: IconDefinition;
  public jobIcon: IconDefinition;
  public backIcon: IconDefinition;

  constructor( private route: ActivatedRoute,
               private httpService: UserDetailsService
             ) { 
               this.emailIcon = faEnvelope;
               this.jobIcon = faCode;
               this.backIcon = faArrowLeft;
             }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.httpService.findById(id).subscribe(u => this.userDetail = u);
  }
}
