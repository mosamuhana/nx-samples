import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { AuthenticationService } from '../../core/services/auth.service';
import { NotificationService } from './../../core/services/notification.service';

@Component({
	selector: 'app-password-reset-request',
	templateUrl: './password-reset-request.component.html',
	styleUrls: ['./password-reset-request.component.scss'],
})
export class PasswordResetRequestComponent implements OnInit {
	loading: boolean = false;
	form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

	constructor(
		private authService: AuthenticationService,
		private notificationService: NotificationService,
		private titleService: Title,
		private router: Router,
	) {}

	ngOnInit() {
		this.titleService.setTitle('angular-material-template - Password Reset Request');
	}

	resetPassword() {
    const { email } = this.form.value;
		this.loading = true;
		this.authService.passwordResetRequest(email).subscribe({
			next: () => {
				this.router.navigate(['/auth/login']);
				this.notificationService.openSnackBar(
					'Password verification mail has been sent to your email address.',
				);
			},
			error: (err: any) => {
				this.notificationService.openSnackBar(err.error);
			},
      complete: () => this.loading = false,
    });
	}

	cancel() {
		this.router.navigate(['/']);
	}
}
