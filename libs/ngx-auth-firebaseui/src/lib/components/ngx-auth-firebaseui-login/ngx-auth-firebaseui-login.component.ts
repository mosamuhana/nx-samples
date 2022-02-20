import {Component, EventEmitter, Inject, Input, OnInit, OnDestroy, Output, PLATFORM_ID, ViewEncapsulation} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatFormFieldAppearance} from '@angular/material/form-field';
import {ThemePalette} from '@angular/material/core';
import {Subscription} from 'rxjs';

import {AuthProcessService, AuthProvider} from '../../services/auth-process.service';
import {NgxAuthFirebaseuiAnimations} from '../../animations';
import { Theme } from '../providers/auth.providers.component';

@Component({
  selector: 'ngx-auth-firebaseui-login',
  templateUrl: './ngx-auth-firebaseui-login.component.html',
  styleUrls: ['./ngx-auth-firebaseui-login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: NgxAuthFirebaseuiAnimations
})
export class NgxAuthFirebaseuiLoginComponent implements OnInit, OnDestroy {
  theme: Theme = Theme.RAISED;
  @Input() logoUrl?: string;
  @Input() providers: AuthProvider[] | AuthProvider = AuthProvider.ALL; //  google, facebook, twitter, github as array or all as one single string
  @Input() appearance: MatFormFieldAppearance = 'standard';
  @Input() registrationEnabled = true;
  @Input() resetPasswordEnabled = true;
  @Input() messageOnAuthSuccess?: string;
  @Input() messageOnAuthError?: string;

  // i18n
  @Input() titleText = 'LOGIN TO YOUR ACCOUNT';
  @Input() rememberMeText = 'Remember Me';
  @Input() loginButtonText = 'LOGIN';
  @Input() orLabelText = 'OR';
  @Input() forgotPasswordText = 'Forgot Password?';
  @Input() dontHaveAnAccountText = 'Don\'t have an account?';
  @Input() createAccountButtonText = 'Create an account';

  // i18n email
  @Input() emailText = 'Email';
  @Input() emailErrorRequiredText = 'Email is required';
  @Input() emailErrorPatternText = 'Please enter a valid email address';

  // i18n password
  @Input() passwordText = 'Password';
  @Input() passwordErrorRequiredText = 'Password is required';

  // Events
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onSuccess: any;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onError: any;
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onCreateAccountRequested: EventEmitter<void> = new EventEmitter<void>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onResetPasswordRequested: EventEmitter<void> = new EventEmitter<void>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onLoginButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  loginForm!: FormGroup;
  authProviders = AuthProvider;
  onErrorSubscription?: Subscription;
  authenticationError = false;

  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    public authProcess: AuthProcessService,
    private formBuilder: FormBuilder) {
    this.onSuccess = authProcess.onSuccessEmitter;
    this.onError = authProcess.onErrorEmitter;
  }

  get color(): string | ThemePalette {
    return this.authenticationError ? 'warn' : 'primary';
  }

  get colorAccent(): string | ThemePalette {
    return this.authenticationError ? 'warn' : 'accent';
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.onErrorSubscription = this.onError.subscribe(() => this.authenticationError = true);
    }

    this.updateAuthSnackbarMessages();

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.onErrorSubscription?.unsubscribe();
  }

  public updateAuthSnackbarMessages(): void {
    this.authProcess.messageOnAuthSuccess = this.messageOnAuthSuccess;
    this.authProcess.messageOnAuthError = this.messageOnAuthError;
  }

  async login() {
    // Emit event for button click
    this.onLoginButtonClicked.emit();
    const { email, password } = this.loginForm.value;

    return await this.authProcess.signInWith(
      this.authProviders.EmailAndPassword,
      { email, password }
    );
  }
}
