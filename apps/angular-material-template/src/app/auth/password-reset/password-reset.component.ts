import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { NotificationService } from '../../core/services/notification.service';
import { AuthenticationService } from '../../core/services/auth.service';

@Component({
	selector: 'app-password-reset',
	templateUrl: './password-reset.component.html',
	styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  private token?: string;
	email?: string;
	form!: FormGroup;
	loading: boolean = false;
	hideNewPassword: boolean;
	hideNewPasswordConfirm: boolean;

	constructor(
		private activeRoute: ActivatedRoute,
		private router: Router,
		private authService: AuthenticationService,
		private notificationService: NotificationService,
		private titleService: Title,
	) {
		this.titleService.setTitle('angular-material-template - Password Reset');
		this.hideNewPassword = true;
		this.hideNewPasswordConfirm = true;
	}

	ngOnInit() {
    this.form = new FormGroup({
			newPassword: new FormControl('', Validators.required),
			newPasswordConfirm: new FormControl('', Validators.required),
		});

		this.activeRoute.queryParamMap.subscribe((params: ParamMap) => {
			this.token = params.get('token') as string;
			this.email = params.get('email') as string;

			if (!this.token || !this.email) {
				this.router.navigate(['/']);
			}
		});
	}

	resetPassword() {
    const { newPassword, newPasswordConfirm } = this.form.value;
    const email = this.email as string;
    const token = this.token as string;

		if (newPassword !== newPasswordConfirm) {
			this.notificationService.openSnackBar('Passwords do not match');
			return;
		}

		this.loading = true;

		this.authService
			.passwordReset(email, token, newPassword, newPasswordConfirm)
			.subscribe({
				next: () => {
					this.notificationService.openSnackBar('Your password has been changed.');
					this.router.navigate(['/auth/login']);
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
