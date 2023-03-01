import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [`
      .app {
        width: 1600px;
        margin: auto;
      }
      .main {
        background-color:white;      
      }
    `],
  template: `
      <div class="app">
        <nav-bar></nav-bar>
        <div class="main">
          <router-outlet></router-outlet>
        </div>
      </div>
    `,
})
export class AppComponent { }