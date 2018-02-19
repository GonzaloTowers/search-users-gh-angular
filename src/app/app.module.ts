import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { SearchComponent } from './search/search.component';
import { Search } from './search-results.service';

const appRoutes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: 'users', component: SearchComponent},
  {path: 'user/:name', component: UsersComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [Search],
  bootstrap: [AppComponent]
})
export class AppModule { }
