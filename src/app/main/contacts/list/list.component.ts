import { CommonModule, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs';
import { Contact } from '../../../core/models/contact';
import { ContactServiceService } from '../../../core/service/contact-service.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule, HttpClientModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  contacts!: Contact[];
  modalAlertDelete: any;
  idSelected!: number;

  constructor(
    private contactService: ContactServiceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.contactService
      .getContacts()
      .pipe(
        tap((resp: Contact[]) => {
          this.contacts = resp;
        })
      )
      .subscribe();
  }

  deleteContact(id: number) {
    this.idSelected = id;
  }

  doDelete() {
    this.contactService.delete(this.idSelected).subscribe(() => {
      this.route.navigate([`/contacts`]);
      this.route
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.route.navigate(['/contacts']));
    });
  }

  doEdit(id: number) {
    this.route.navigate([`/contacts/edit/${id}`]);
  }
}
