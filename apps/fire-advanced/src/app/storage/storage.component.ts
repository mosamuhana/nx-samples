import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { traceUntilFirst } from '@angular/fire/performance';
import { keepUnstableUntilFirst } from '@angular/fire';

const TRANSPARENT_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

@Component({
  selector: 'app-storage',
  template: `
    <p>
      Storage!
      <img [src]="downloadUrl$ | async" width="64" height="64" />
    </p>
  `,
  styles: []
})
export class StorageComponent {
  public readonly downloadUrl$: Observable<string>;

  constructor(state: TransferState) {
    const key = makeStateKey<string>('google-icon-url');
    const existing = state.get(key, undefined);
    this.downloadUrl$ = existing ? of(existing) : of(undefined).pipe(
      switchMap(() => import('./lazyStorage')),
      switchMap(({ iconUrl }) => iconUrl),
      keepUnstableUntilFirst,
      traceUntilFirst('storage'),
      tap(it => state.set(key, it)),
      startWith(TRANSPARENT_PNG),
    );
  }
}
