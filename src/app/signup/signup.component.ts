import {
  Component,
  Renderer2,
  PLATFORM_ID,
  OnInit,
  OnDestroy,
  Inject,
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
import { SignupService } from '../signup.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit, OnDestroy {
  constructor(
    private readonly signup: SignupService,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  goToSignIn() {
    this.router.navigate(['/login']);
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

  registerationForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(32),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.minLength(8)]),
  });

  sendData() {
    if (this.registerationForm.valid)
      this.signup.signup(this.registerationForm.value).subscribe({
        next: (res) => {
          console.log('form sent for server');
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          this.errorMessage = err.error.error || 'An error occurred';
          console.error(this.errorMessage);
        },
      });
  }

  // signup auth end
}
