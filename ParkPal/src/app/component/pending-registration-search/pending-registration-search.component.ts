import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pending-registration-search',
  templateUrl: './pending-registration-search.component.html',
  styleUrls: ['./pending-registration-search.component.scss']
})
export class PendingRegistrationSearchComponent {
  searchTerm = '';
  constructor(activatedRoute:ActivatedRoute, private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm']) this.searchTerm = params['searchTerm'];
    });
  }

  search(term:string):void{
    if(term){
      this.router.navigateByUrl('pending-registrations/'+ term);
    }
    else{
      this.router.navigateByUrl('pending-registrations');
    }
  }
}
