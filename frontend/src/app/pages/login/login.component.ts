import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatCard,
    MatCardContent,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formData = {
    email: '',
    password: '',
  };

  constructor(
    private apiService: ApiService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

  login(): void {
    this.apiService
      .post('/api/login', {
        email: this.formData.email,
        password: this.formData.password,
      })
      .subscribe({
        next: (response) => {
          const token = response.token;
          if (token) {
            sessionStorage.setItem('auth-token', token);
            this.router.navigate(['/table']);
          } else {
            this.formData.email = '';
            this.formData.password = '';
            this.openSnackBar(response?.data?.message, 'ok');
          }
        },
        error: (e) => {
          this.formData.email = '';
          this.formData.password = '';
          this.openSnackBar(e?.error?.message, 'ok');
        },
      });
  }
}
