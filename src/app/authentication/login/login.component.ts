import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isError = false;

  // loginForm = {
  //   username: '',
  //   password: ''
  // }

  loginForm = NgForm;
  

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    
  }

  login(data: NgForm): any {
    if (data.invalid) return this.isError = true;

    this.authService.login(data.value.username, data.value.password).subscribe({

      next: (adminResult) => {
        if (adminResult?.email) {
          this.router.navigateByUrl('/dashboard');
        }
        this.isError = true;
      },

      error: (err) => {
        this.isError = true;
      }
    })
  }

}
