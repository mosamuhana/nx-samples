import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
	AuthProcessService,
	AuthProvider,
} from '../../services/auth-process.service';
import { NgxAuthFirebaseuiAnimations } from '../../animations';
import { LegalityDialogComponent } from '..';
import { LegalityDialogParams, LegalityDialogResult } from '../../interfaces';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

export enum Theme {
	DEFAULT = 'default',
	CLASSIC = 'classic',
	STROKED = 'stroked',
	FAB = 'fab',
	MINI_FAB = 'mini-fab',
	RAISED = 'raised',
}

export enum Layout {
	ROW = 'row',
	COLUMN = 'column',
}

@Component({
	selector: 'ngx-auth-firebaseui-providers',
	templateUrl: 'auth.providers.component.html',
	styleUrls: ['auth.providers.component.scss'],
	animations: NgxAuthFirebaseuiAnimations,
})
export class AuthProvidersComponent {
	@Input() theme?: Theme; // theme: string = Theme.DEFAULT;
	@Input() layout: string = 'row';
	@Input() providers: AuthProvider[] | AuthProvider = AuthProvider.ALL; //  google, facebook, twitter, github, microsoft, yahoo

	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() onSuccess!: EventEmitter<any>;
	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() onError!: EventEmitter<any>;

	@Input() tosUrl?: string;
	@Input() privacyPolicyUrl?: string;

	dialogRef?: MatDialogRef<LegalityDialogComponent>;

	themes = Theme;
	authProvider = AuthProvider;

	constructor(
		public authProcess: AuthProcessService,
		public dialog: MatDialog,
	) {
		this.onSuccess = authProcess.onSuccessEmitter;
		this.onError = authProcess.onErrorEmitter;
	}

	processLegalSignUP(authProvider?: AuthProvider) {
		if (this.tosUrl || this.privacyPolicyUrl) {
			const params: LegalityDialogParams = {
				tosUrl: this.tosUrl!,
				privacyPolicyUrl: this.privacyPolicyUrl!,
				authProvider: authProvider!,
			};

			this.dialogRef = this.dialog.open(LegalityDialogComponent, {
				data: params,
			});
			this.dialogRef.afterClosed().subscribe((result: LegalityDialogResult) => {
				if (result && result.checked) {
					// this._afterSignUpMiddleware(result.authProvider).then(() => this.signUpFormGroup.reset());
					this.authProcess.signInWith(authProvider!);
				}
				this.dialogRef = undefined;
			});
		} else {
			// this._afterSignUpMiddleware(authProvider).then(() => this.signUpFormGroup.reset());
			this.authProcess.signInWith(authProvider!);
		}
	}
}
