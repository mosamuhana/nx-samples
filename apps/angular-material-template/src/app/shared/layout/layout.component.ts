import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription, timer } from 'rxjs';
//import { TimerObservable } from 'rxjs/observable/TimerObservable';

import { AuthenticationService } from '../../core/services/auth.service';
import { SpinnerService } from '../../core/services/spinner.service';
import { AuthGuard } from '../../core/guards/auth.guard';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
	private _mobileQueryListener: () => void;
	mobileQuery: MediaQueryList;
	//showSpinner?: boolean;
	userName!: string;
	isAdmin!: boolean;

	private autoLogoutSubscription?: Subscription;

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private media: MediaMatcher,
		public spinnerService: SpinnerService,
		private authService: AuthenticationService,
		private authGuard: AuthGuard,
	) {
		this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
		this._mobileQueryListener = () => {
      console.log('mobileQuery changed');
      changeDetectorRef.detectChanges();
    };
		this.mobileQuery.addEventListener('change', this._mobileQueryListener);
	}

	ngOnInit(): void {
		const user = this.authService.getCurrentUser();

		this.isAdmin = user.isAdmin;
		this.userName = user.fullName;

		// Auto log-out subscription
		const _timer = timer(2000, 5000);
		this.autoLogoutSubscription = _timer.subscribe(() => {
			this.authGuard.canActivate();
		});
	}

	ngOnDestroy(): void {
		this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
		this.autoLogoutSubscription?.unsubscribe();
	}

	ngAfterViewInit(): void {
		this.changeDetectorRef.detectChanges();
	}
}
