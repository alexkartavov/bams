/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TimePassedPipe } from './time-passed.pipe';

describe('Pipe: TimePassed', () => {

  const pipe = new TimePassedPipe();

  const addDays = (d, num) => {
    let value = d.valueOf();
    value += 86400000 * num;
    return new Date(value);
  };

  const addSeconds = (d, num) => {
    let value = d.valueOf();
    value += 1000 * num;
    return new Date(value);
  };

  const addMinutes = (d, num) => {
    let value = d.valueOf();
    value += 60000 * num;
    return new Date(value);
  };

  const addHours = (d, num) => {
    let value = d.valueOf();
    value += 3600000 * num;
    return new Date(value);
  };

  const addMonths = (d, num) => {
    const value = new Date(d.valueOf());

    let mo = d.getMonth();
    let yr = d.getFullYear();

    mo += num;
    if (mo < 0) {
        yr += Math.floor(mo / 12);
        mo = mo % 12 + 12;
    } else if (mo >= 12) {
        yr += Math.floor(mo / 12);
        mo %= 12;
    }
    value.setMonth(mo);
    value.setFullYear(yr);

    return value;
  };

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Years', () => {
    let d = new Date();
    d = addMonths(d, -12);
    expect(pipe.transform(d)).toEqual('A year ago');
    d = addMonths(d, -12);
    expect(pipe.transform(d)).toEqual('2 years ago');
  });

  it('Months', () => {
    let d = new Date();
    d.setDate(1);
    d = addMonths(d, -1);
    expect(pipe.transform(d)).toEqual('A month ago');
    d = addMonths(d, -1);
    expect(pipe.transform(d)).toEqual('2 months ago');
  });

  it('Days', () => {
    let d = new Date();
    d.setHours(0);
    d = addDays(d, -1);
    expect(pipe.transform(d)).toEqual('A day ago');
    d = addDays(d, -1);
    expect(pipe.transform(d)).toEqual('2 days ago');
  });

  it('Hours', () => {
    let d = new Date();
    d.setMinutes(0);
    d = addHours(d, -1);
    expect(pipe.transform(d)).toEqual('An hour ago');
    d = addHours(d, -1);
    expect(pipe.transform(d)).toEqual('2 hours ago');
  });

  it('Minutes', () => {
    let d = new Date();
    d.setSeconds(0);
    d = addMinutes(d, -1);
    expect(pipe.transform(d)).toEqual('A minute ago');
    d = addMinutes(d, -1);
    expect(pipe.transform(d)).toEqual('2 minutes ago');
  });

  it('Now', () => {
    const d = new Date();
    expect(pipe.transform(d)).toEqual('Just now');
  });

});
