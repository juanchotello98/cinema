import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup = this.formBuilder.group({

    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private authService:AuthService) { }

  login(){    
    this.authService.login(this.loginForm.value)
    .subscribe( res => {

      if(res.token) {
        this.router.navigateByUrl('/movies/list')
      } else {
        Swal.fire('Error',res, 'error');
      }
      
    });

  }
}
