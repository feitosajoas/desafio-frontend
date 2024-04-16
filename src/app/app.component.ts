import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'frontend';
  isAuth: boolean = false;
  localstorage: any;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {
    this.isAuth = this.getItem() ? true : false;
  }

  getItem() {
    if (isPlatformBrowser(this.document)) {
      return JSON.parse(localStorage.getItem('auth') as string) ? true : false;
    }
    return;
  }
}
