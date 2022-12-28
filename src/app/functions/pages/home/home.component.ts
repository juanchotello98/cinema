import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AddComponent } from '../add/add.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles:[`
    .container{
      margin:10px;
    } 
  `]
})
export class HomeComponent implements OnInit {

  constructor(private dialog: MatDialog, private router : Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(AddComponent, {
      width:'30%'
    });
  }

  logout() {
    this.router.navigateByUrl('/auth/login');
    this.authService.logout();
  }

}
