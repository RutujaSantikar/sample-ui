import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  teamMembers = [

    { name: 'John', role: 'Developer' },
    { name: 'Jane', role: 'Designer' },
    { name: 'Bob', role: 'Developer' },
    { name: 'Alice', role: 'Designer' },
    { name: 'Joe', role: 'Developer' },
    { name: 'Mary', role: 'Designer' },
    { name: 'Jack', role: 'Developer' },
    { name: 'Jill', role: 'Designer' },




  ];

}
