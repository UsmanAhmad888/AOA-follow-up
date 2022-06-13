import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { fromEvent, merge, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../services/auth/auth.service';
import { LoginFormErrors } from './loginFormError';
import { GenericValidator } from '../services/generic-validator';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];
  loginForm: FormGroup;

  username: string;
  password: string;
  returnUrl: string = '';
  errorMessage: string = null;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    public fb:FormBuilder

  ) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ;
    this.validationMessages = LoginFormErrors;
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.loginForm=this.fb.group({
      username:['',[Validators.required]],
      password:[,[Validators.required]]
    })

  }
  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));
    merge(this.loginForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(500)
    ).subscribe((value: any) => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.spinner.show();
      console.log("login data",this.loginForm.value);
      
      this.authService.login(this.loginForm.value).subscribe((res) => {
        this.spinner.hide();
        localStorage.setItem('au$#n' , this.username)
        this.router.navigate(['/home'] , { queryParams: { guid: this.returnUrl }});
      }, (err) => {
        console.log(err)
        this.spinner.hide();
        this.errorMessage = err;
      });
    }else{
      this.displayMessage = this.genericValidator.processMessages(this.loginForm, true);
    }
  }

}
