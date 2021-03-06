import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LegalityDialogParams, LegalityDialogResult} from '../../interfaces';

@Component({
  selector: 'ngx-auth-firebaseui-legality-dialog',
  templateUrl: './legality-dialog.component.html',
  styleUrls: ['./legality-dialog.component.scss']
})
export class LegalityDialogComponent {
  checkTOS: boolean = false;
  checkPrivacyPolicy: boolean = false;
  private _disableConfirmActionButton = false;

  constructor(
    public dialogRef: MatDialogRef<LegalityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LegalityDialogParams,
  ) {}

  get disableConfirmActionButton(): boolean {
    if (this.data.tosUrl && this.data.privacyPolicyUrl) {
      this._disableConfirmActionButton = !(this.checkTOS && this.checkPrivacyPolicy);
    } else if (this.data.tosUrl && !this.data.privacyPolicyUrl) {
      this._disableConfirmActionButton = !this.checkTOS;
    } else if (!this.data.tosUrl && this.data.privacyPolicyUrl) {
      this._disableConfirmActionButton = !this.checkPrivacyPolicy;
    }
    return this._disableConfirmActionButton;
  }

  closeDialog() {
    const result: LegalityDialogResult = {
      checked: !this.disableConfirmActionButton,
      authProvider: this.data.authProvider
    };
    this.dialogRef.close(result);
  }
}
