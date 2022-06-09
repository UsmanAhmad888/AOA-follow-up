import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService , 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    this.authService.clearToken();
    console.log(this.route.queryParams['guid']);
    this.router.navigate(['/login'] , { queryParams: { returnUrl: this.route.snapshot.queryParams['guid'] }});
  }
}
