import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VersioningService {
  constructor() {}

  public versionChange = new BehaviorSubject<string>('red');
  version: Observable<string> = this.versionChange.asObservable();
  toggleVersion(version: string) {   
    this.versionChange.next(version);
  }
}
