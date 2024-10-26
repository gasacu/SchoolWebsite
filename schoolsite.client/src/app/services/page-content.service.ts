import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PageContent } from '../../entities/pageContent';

@Injectable({
  providedIn: 'root'
})
export class PageContentService {

  private apiUrl = `${environment.apiUrl}/pageContent`

  constructor(private http: HttpClient) { }

  getPageContents(): Observable<PageContent[]> {
    return this.http.get<PageContent[]>(this.apiUrl);
  }

  getPageContentById(id: number): Observable<PageContent> {
    return this.http.get<PageContent>(`${this.apiUrl}/${id}`);
  }

  createPageContent(pageContent: PageContent): Observable<PageContent> {
    return this.http.post<PageContent>(this.apiUrl, pageContent);
  }

  deletePageContent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editPageContent(pageContent: PageContent): Observable<PageContent> {
    return this.http.put<PageContent>(`${this.apiUrl}/${pageContent.id}`, pageContent);
  }
}
