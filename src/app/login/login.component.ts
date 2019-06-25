import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute, private authService: AuthService) { }

  user:string;

  ngOnInit() {
    this.user = this.route.snapshot.paramMap.get("id");
    console.log("aaa");
    this.authService.login(this.user);
    this.router.navigate(["/upload"]);
  }

}
