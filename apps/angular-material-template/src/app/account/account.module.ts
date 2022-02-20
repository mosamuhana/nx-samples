import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';

@NgModule({
	declarations: [
		ProfileComponent,
		ChangePasswordComponent,
		ProfileDetailsComponent,
	],
	imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule,
  ],
	exports: [ProfileComponent],
})
export class AccountModule {}
