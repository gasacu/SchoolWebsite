import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TeamMember } from '../../entities/teamMember';

@Injectable({
  providedIn: 'root',
})
export class TeamMemberService {
  private apiUrl = `${environment.apiUrl}/teamMember`;

  constructor(private http: HttpClient) {}

  getTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(this.apiUrl);
  }

  getTeamMemberById(id: number): Observable<TeamMember> {
    return this.http.get<TeamMember>(`${this.apiUrl}/${id}`);
  }

  createTeamMember(teamMember: TeamMember): Observable<TeamMember> {
    return this.http.post<TeamMember>(this.apiUrl, teamMember);
  }

  deleteTeamMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  editTeamMember(teamMember: TeamMember): Observable<TeamMember> {
    return this.http.put<TeamMember>(
      `${this.apiUrl}/${teamMember.id}`,
      teamMember
    );
  }

  uploadImage(file: File): Observable<{ path: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ path: string }>(`${this.apiUrl}/upload`, formData);
  }
}
