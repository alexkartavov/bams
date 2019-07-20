import { Injectable } from '@angular/core';
import { SupportUserDataService } from './support-user-data.service';
import { AuthService } from './auth.service';
import { ValueProcessingService } from './value-processing.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private authService: AuthService,
    private userService: SupportUserDataService,
    private valueService: ValueProcessingService) { }

  // section is . separated path to the value in profile
  // ex: get('merchantsGrid.mid.width')
  get(section: string): any {
    if (!section) {
      return;
    }

    let profile = this.getProfile();
    const path = section.split('.');
    let i = 0;

    while (profile && i < path.length) {
      profile = profile[path[i++]];
    }
    return profile;
  }

  // section is . separated path to the value in profile
  // ex: get('merchantsGrid.mid.width')
  // value must be JSON serilalizable value or object
  set(section: string, value) {
    if (!section) {
      return;
    }
    const profile = this.getProfile();
    const path = section.split('.');
    let i = 0;
    let profileSection = profile;
    while (i < path.length - 1) {
      if (typeof profileSection[path[i]] !== 'object') {
        if (typeof profileSection[path[i]] !== 'undefined') {
          console.warn('Overriding profile setting - ' + path[i]);
        }
        profileSection[path[i]] = {};
      }
      profileSection = profileSection[path[i++]];
    }
    profileSection[path[path.length - 1]] = value;

    this.setProfile(profile);
  }

  remove(section: string) {
    if (!section) {
      return;
    }
    const profile = this.getProfile();
    const path = section.split('.');
    let i = 0;
    let profileSection = profile;
    while (i < path.length - 1) {
      if (typeof profileSection[path[i]] !== 'object') {
        if (typeof profileSection[path[i]] !== 'undefined') {
          console.warn('Overriding profile setting - ' + path[i]);
        }
        profileSection[path[i]] = {};
      }
      profileSection = profileSection[path[i++]];
    }
    delete profileSection[path[path.length - 1]];

    this.setProfile(profile);
  }

  getProfile(): any {
    const profileStr = localStorage.getItem(this.valueService.profileId);
    let profile: any = {};
    if (profileStr) {
      profile = JSON.parse(profileStr);
    }
    return profile;
  }

  setProfile(profile: any, updateServer = true) {
    if (!profile) {
      localStorage.removeItem(this.valueService.profileId);
      return;
    }

    const profileStr = JSON.stringify(profile);
    localStorage.setItem(this.valueService.profileId, profileStr);
    if (updateServer) {
      this.userService.setProfile(this.authService.getUserId(), profile);
    }
  }
}
