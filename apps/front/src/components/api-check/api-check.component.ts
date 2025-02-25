import { Component, OnInit } from '@angular/core';
import { ApiCheckService, ApiStatus } from './api-check.service';

@Component({
  selector: 'log-api-check',
  templateUrl: './api-check.component.html',
  styleUrls: ['./api-check.component.scss'],
})
export class ApiCheckComponent implements OnInit {
  statuses: ApiStatus[] = this.apiCheckService.apis;

  constructor(private apiCheckService: ApiCheckService) {}

  ngOnInit(): void {
    setInterval(() => this.checkStatus(), 60000);
    this.checkStatus();
  }

  private checkStatus() {
    this.apiCheckService.getApiStatuses().subscribe((res) => {
      this.statuses = res;
    });
  }
}
