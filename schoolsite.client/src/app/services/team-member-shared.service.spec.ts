import { TestBed } from '@angular/core/testing';

import { TeamMemberSharedService } from './team-member-shared.service';

describe('TeamMemberSharedService', () => {
  let service: TeamMemberSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamMemberSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
