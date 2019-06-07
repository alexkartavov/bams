import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AuthGuard } from './auth.guard';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../routes';
import { HomeComponent } from '../home/home.component';
import { FormsModule } from '@angular/forms';
import { TabsComponent } from '../tabs/tabs.component';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        TabsComponent
      ],
      imports: [
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        FormsModule
      ],
      providers: [AuthGuard]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
