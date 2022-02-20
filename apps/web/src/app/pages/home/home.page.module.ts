import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { HomePage } from './home.page';

const routes: Routes = [
  { path: '', component: HomePage },
];

@NgModule({
	declarations: [HomePage],
	imports: [
    CommonModule,
		RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
	],
})
export class HomePageModule {}
