import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validator,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.addClass(document.body, 'background');
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.renderer.removeClass(document.body, 'background');
    }
  }
  // signup auth start
  errorMessage: string = '';

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.minLength(8)]),
  });

  sendData() {
    if (this.loginForm.valid)
      this.loginService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log('Response from server:', res);

          // Check if the response contains a token
          const token = res.token;

          if (token) {
            // Save the token to localStorage
            localStorage.setItem('authToken', token);
            this.router.navigate(['/home']);
            window.location.reload();
          } else {
            this.errorMessage = 'No token received from the server';
          }
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.error || 'Wrong Email or Password';
          console.error(this.errorMessage);
        },
      });
  }
  // signup auth end
  user: any = true;
}
