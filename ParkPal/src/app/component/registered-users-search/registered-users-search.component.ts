import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registered-users-search',
  templateUrl: './registered-users-search.component.html',
  styleUrls: ['./registered-users-search.component.scss']
})
export class RegisteredUsersSearchComponent {
  searchTerm = '';
  constructor(activatedRoute:ActivatedRoute, private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm']) this.searchTerm = params['searchTerm'];
    });
  }

  search(term:string):void{
    if(term){
      // this.router.navigateByUrl('pending-registrations/'+ term);
      this.router.navigateByUrl('registered-users/'+ term);
    }
    else{
      this.router.navigateByUrl('registered-users');
    }
  }
}   
