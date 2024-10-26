import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Document } from '../../entities/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = `${environment.apiUrl}/document`

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl);
  }

  getDocumentById(id: number): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/${id}`);
  }

  createDocument(document: Document): Observable<Document> {
    return this.http.post<Document>(this.apiUrl, document);
  }

  deleteDocument(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editDocument(document: Document): Observable<Document> {
    return this.http.put<Document>(`${this.apiUrl}/${document.id}`, document);
  }
}
