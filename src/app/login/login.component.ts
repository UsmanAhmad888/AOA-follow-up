import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  returnUrl: string = '';
  errorMessage: string = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ;
  }

  onSubmit(){
    this.spinner.show();
    this.authService.login(this.email, this.password).subscribe((res) => {
      this.spinner.hide();
      localStorage.setItem('au$#n' , this.email)
      this.router.navigate(['/home'] , { queryParams: { guid: this.returnUrl }});
    }, (err) => {
      console.log(err)
      this.spinner.hide();
      this.errorMessage = err;
    });
  }

}
