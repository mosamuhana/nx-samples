import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { throwError, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';

import { AuthenticationService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;
	loading: boolean = false;

	constructor(
		private router: Router,
		private titleService: Title,
		private notificationService: NotificationService,
		private authenticationService: AuthenticationService,
	) {}

	ngOnInit() {
		this.titleService.setTitle('angular-material-template - Login');
		this.authenticationService.logout();

    const savedUserEmail = localStorage.getItem('savedUserEmail');

		this.loginForm = new FormGroup({
			email: new FormControl(savedUserEmail, [
				Validators.required,
				Validators.email,
			]),
			password: new FormControl('', Validators.required),
			rememberMe: new FormControl(savedUserEmail !== null),
		});
	}

	login() {
    const { email, password, rememberMe } = this.loginForm.value;

		this.loading = true;
		this.authenticationService.login(email.toLowerCase(), password)
    .subscribe({
      next: () => {
        if (rememberMe) {
          localStorage.setItem('savedUserEmail', email);
        } else {
          localStorage.removeItem('savedUserEmail');
        }
        this.router.navigate(['/']);
      },
      error: err => {
				this.notificationService.openSnackBar(err.error);
      },
      complete: () => this.loading = false,
    });
	}

	resetPassword() {
		this.router.navigate(['/auth/password-reset-request']);
	}
}
