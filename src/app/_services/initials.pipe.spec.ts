/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { InitialsPipe } from './initials.pipe';

describe('Pipe: Initialse', () => {
  const pipe = new InitialsPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('extract initials', () => {
    expect(pipe.transform('test user 1')).toEqual('TU');
  });
});
