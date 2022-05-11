import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ["login.component.scss"]
})
export class LoginComponent {

  user: any = { username: "", password: "", result: false, msg: "" };

  constructor(private apiService: ApiService, private router: Router) {
    var e = localStorage.getItem("token");
    if (e != null || e == "") {
      this.router.navigate(['/']);
    }
  }

  login() {
    console.log(this.user);
    this.apiService.login({ email: this.user.username, password: this.user.password }).subscribe((result: any) => {
      if (result.err) {
        this.user.result = true;
        this.user.msg = result.msg;
        return;
      }
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      this.router.navigate(['/']);
    });
  }
}

