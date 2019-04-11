import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timepassed'
})
export class TimePassedPipe implements PipeTransform {

  transform(value: Date, args?: any): string {

    if (!value) {
      return '';
    }

    const diff = this.datetimeDiff(value, new Date());

    if (diff.years > 1) {
      return diff.years + ' years ago';
    }
    if (diff.years === 1) {
      return 'A year ago';
    }

    if (diff.months > 1) {
      return diff.months + ' months ago';
    }
    if (diff.months === 1) {
      return 'A month ago';
    }

    if (diff.days > 1) {
      return diff.days + ' days ago';
    }
    if (diff.days === 1) {
      return 'A day ago';
    }

    if (diff.hours > 1) {
      return diff.hours + ' hours ago';
    }
    if (diff.hours === 1) {
      return 'An hour ago';
    }

    if (diff.minutes > 1) {
      return diff.minutes + ' minutes ago';
    }
    if (diff.minutes === 1) {
      return 'A minute ago';
    }

    return 'Just now';
  }

  datetimeDiff (from: Date, to: Date) {

    const min = [-Infinity, 1, 1, 0, 0, 0, 0];
    const max = [Infinity, 12, null, 24, 60, 60, 1000];

    if (to < from) {
        const temp = to;
        to = from;
        from = temp;
    }

    const start = [from.getUTCFullYear(), from.getUTCMonth() + 1, from.getUTCDate(), from.getUTCHours(),
            from.getUTCMinutes(), from.getUTCSeconds(), from.getUTCMilliseconds()],
        end = [to.getUTCFullYear(), to.getUTCMonth() + 1, to.getUTCDate(), to.getUTCHours(), to.getUTCMinutes(),
            to.getUTCSeconds(), to.getUTCMilliseconds()];
    let i = 7;

    const dec = (j: number) => {
        --end[j];
        while (end[j] < min[j]) {
            const r = dec(j - 1);
            end[j] += max[j] === null
                ? r
                : max[j];
        }
        return j === 1 ? new Date(Date.UTC(end[0], end[1], 0)).getUTCDate() : max[j + 1];
    };

    while (i > 0) {
        --i;
        let diff = end[i] - start[i];
        while (diff < 0) {
            end[i] += dec(i - 1);
            diff = end[i] - start[i];
        }
        end[i] = diff;
    }

    return {
        years: end[0],
        months: end[1],
        days: end[2],
        hours: end[3],
        minutes: end[4],
        seconds: end[5],
        milliseconds: end[6]
    };
  }
}
