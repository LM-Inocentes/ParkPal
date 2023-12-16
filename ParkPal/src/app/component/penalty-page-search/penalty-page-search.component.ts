import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-penalty-page-search',
  templateUrl: './penalty-page-search.component.html',
  styleUrls: ['./penalty-page-search.component.scss']
})
export class PenaltyPageSearchComponent {
  searchTerm = '';
  constructor(activatedRoute:ActivatedRoute, private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm']) this.searchTerm = params['searchTerm'];
    });
  }

  search(term:string):void{
    if(term){
      this.router.navigateByUrl('app-penalty-page/'+ term);
    }
    else{
      this.router.navigateByUrl('app-penalty-page');
    }
  }
}
