import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Search} from '../search-results.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {
  public user;
  public repos;
  public name: string;
  private _sub;

  constructor(private _searchService: Search, private route: ActivatedRoute) { }

  ngOnInit() {
    this._sub = this.route.params.subscribe(params =>{
      this.name = params['name'];
      this.getUser(this.name);
      this.getRepos(this.name);
    });
  }

  getUser(username: string){
    this._searchService.getUserDetails(username).subscribe(
      userDetails =>{
        this.user = userDetails;
      },
      error =>{
        console.error(error);
      }
    );
  }

  getRepos(username: string){
    this._searchService.getRepositories(username).subscribe(
      repos =>{
        this.repos = repos;
      },
      error =>{
        console.error(error);
      }
    );
  }

}
