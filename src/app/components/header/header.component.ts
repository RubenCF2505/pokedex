import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SelectComponent } from '../select/select.component';

@Component({
    selector: 'app-header',
    imports: [RouterModule, CommonModule, SelectComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  router: any;
  ngOnInit(): void {
    
  }
  
}
