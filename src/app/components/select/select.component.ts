import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VersioningService } from '../../services/versioning.service';
import { Versions } from '../../versions';
import { Version } from '../../typeVersion';
import { forkJoin, switchMap } from 'rxjs';
@Component({
  selector: 'app-select',
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  constructor(public service: VersioningService) {}
  versionsUrl = 'https://pokeapi.co/api/v2/version';
  httpClient = inject(HttpClient);
  versionData?: Versions;
  datalist: Version[] = [];
  selectedVersion: string = 'red';
  maxVersions: number = 0;

  ngOnInit() {
    this.getInfo();

    this.service.toggleVersion(this.selectedVersion);
  }

  getInfo() {
    this.httpClient
      .get<any>(`${this.versionsUrl}?limit=50`)
      .pipe(
        switchMap((versionData) => {
          this.maxVersions = versionData.count;

          const requests = [];
          for (let i = 1; i < this.maxVersions; i++) {
            requests.push(this.httpClient.get(`${this.versionsUrl}/${i}`));
          }

          return forkJoin(requests);
        })
      )
      .subscribe((versions: any) => {
        this.datalist = versions;
      });
    this.filter(this.datalist);
  }

  filter(lista: Version[]) {
    console.log(lista.map((data) => data.names));
  }
}
