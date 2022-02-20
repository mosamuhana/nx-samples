import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-select-check-all',
  templateUrl: './select-check-all.component.html',
  styleUrls: ['./select-check-all.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectCheckAllComponent implements OnInit {
  @Input() model!: FormControl;
  @Input() values = [];
  @Input() text = 'Select All';

  constructor() { }

  ngOnInit() {}

  get isChecked(): boolean {
    const value = this.model.value;
    return value && this.values.length && value.length === this.values.length;
  }

  get isIndeterminate(): boolean {
    const value = this.model.value;
    return value && this.values.length && value.length && value.length < this.values.length;
  }

  toggleSelection(change: MatCheckboxChange): void {
    if (change.checked) {
      this.model.setValue(this.values);
    } else {
      this.model.setValue([]);
    }
  }
}
