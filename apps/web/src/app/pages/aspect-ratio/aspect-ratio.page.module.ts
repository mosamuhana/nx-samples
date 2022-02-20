import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AspectRatioPage } from './aspect-ratio.page';

const routes: Routes = [
  { path: '', component: AspectRatioPage },
];

@NgModule({
	declarations: [AspectRatioPage],
	imports: [
    CommonModule,
		RouterModule.forChild(routes),
	],
})
export class AspectRatioPageModule {}
