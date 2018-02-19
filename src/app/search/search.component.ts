import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Search} from '../search-results.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  userName: string;
  page = 1;
  results: any[] = [];
  selected = false;
  selectedUser: any;
  error_text = '';

  constructor(private searchService: Search, private router: Router) { }

  ngOnInit() {
  }

  search(userName: string){
    this.userName = userName;
    /*this.selected = false;*/
    this.error_text = '';
    this.searchService.searchByUserName(userName).subscribe(
      users =>{
        this.results = users;
      },
      error =>{
        this.results = [];
        this.error_text = 'Sorry, no users found. You can type a different name';
        console.error(error);
      }
    );
  }

  getUser(userName: string){
    this.router.navigate(['/user', userName]);
  }

}
