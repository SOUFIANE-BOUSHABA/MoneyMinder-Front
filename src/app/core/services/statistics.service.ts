import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import  { Observable } from "rxjs"
import  { StatisticsVM } from "../models/statistics.model"

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = "http://localhost:8080/api/statistics"

  constructor(private http: HttpClient) {}

  getStatistics(): Observable<StatisticsVM> {
    return this.http.get<StatisticsVM>(this.apiUrl)
  }
}

