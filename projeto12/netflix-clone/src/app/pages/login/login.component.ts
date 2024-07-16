import { Component, inject } from '@angular/core';
import { BG_IMG_URL, LOGO_URL } from '../../constants/config';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
bgUrl = BG_IMG_URL;

email!: string;
password!: string;
loginService = inject(LoginService)
router = inject(Router)
toasterService=inject(ToastrService)


  ngOnInit(){
    if(this.loginService.isLoggedIn){
      this.router.navigateByUrl('/browse')
    }
  }
  onSubmit(){
    //validate email and password
    if (!this.email || !this.password) {
      this.toasterService.error("provide email or password")
      return;
    }
    //if email and password is correct lets login the user
    this.loginService.login(this.email, this.password);

     // now we are logged in so we will redirect to our browse page
      this.toasterService.success('logged in sucessfully.')
      this.router.navigateByUrl("/browse");
  }

}
