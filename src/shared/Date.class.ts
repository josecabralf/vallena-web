import moment, { type Moment } from 'moment';
import { Dayjs } from 'dayjs';
export class Date {
  private date: Moment;

  constructor(date?: string | number | globalThis.Date | Moment) {
    this.date = date ? moment(date) : moment();
  }

  // Get current date
  static now(): Date {
    return new Date();
  }

  // Format the date
  format(formatStr: 'TIME-STAMP' | string): string {
    if (formatStr === 'TIME-STAMP') return this.toISOString();
    return this.date.format(formatStr);
  }

  toISOString(): string {
    return this.format('YYYY-MM-DD HH:mm:ss');
  }

  // Parse a date string
  static parse(dateStr: string, formatStr?: string): Date {
    if (formatStr) return new Date(moment(dateStr, formatStr));
    return new Date(moment(dateStr));
  }

  // Get the date as a Moment object
  toMoment(): Moment {
    return this.date;
  }

  // Get the date as a JavaScript Date object
  toDate(): globalThis.Date {
    return this.date.toDate();
  }

  // Add days to the date
  addDays(days: number): Date {
    this.date = this.date.add(days, 'days');
    return this;
  }

  // Add milliseconds with timezone adjustment
  addMillisecondsWithOffset(
    milliseconds: number,
    offset: string = '-03:00'
  ): Date {
    this.date = this.date.utcOffset(offset).add(milliseconds, 'milliseconds');
    return this;
  }

  // Subtract days from the date
  subtractDays(days: number): Date {
    this.date = this.date.subtract(days, 'days');
    return this;
  }

  // subtract hours from the date
  substractHours(hours: number): Date {
    this.date = this.date.subtract(hours, 'hours');
    return this;
  }

  // Get the day of the week
  getDay(): number {
    return this.date.day();
  }

  // Get the month
  getMonth(): number {
    return this.date.month();
  }

  // Get the year
  getYear(): number {
    return this.date.year();
  }

  // Check if the date is before another date
  isBefore(date: Date): boolean {
    return this.date.isBefore(date.toMoment());
  }

  // Check if the date is after another date
  isAfter(date: Date): boolean {
    return this.date.isAfter(date.toMoment());
  }

  // Check if two dates are the same
  isSame(date: Date, granularity?: moment.unitOfTime.StartOf): boolean {
    return this.date.isSame(date.toMoment(), granularity);
  }

  // Date to minutes
  toMinutes(): number {
    return this.date.minutes();
  }

  // Date to milliseconds
  toMilliseconds(): number {
    return this.date.milliseconds();
  }

  addDuration(duration: string, offset: string = '-03:00'): Date {
    const milliseconds = moment.duration(duration).asMilliseconds();
    return this.addMillisecondsWithOffset(milliseconds, offset);
  }

  // Start of the day
  startOf(day: 'day' | 'month' | 'year'): Date {
    this.date.startOf(day);
    return this;
  }

  // End of the day
  endOf(day: 'day' | 'month' | 'year'): Date {
    this.date.endOf(day);
    return this;
  }

  // To nearest hour
  toNearestHour() {
    return this.date.startOf('hour');
  }

  // Check overlapping between intervals
  static isTimeOverlap(
    start1: Date,
    end1: Date,
    start2: Date,
    end2: Date
  ): boolean {
    return start1.isBefore(end2) && end1.isAfter(start2);
  }

  // Parse a time string to ISO format
  static parseTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = Date.now().toMoment().hours(hours).minutes(minutes).seconds(0);
    return date.format('YYYY-MM-DD HH:mm:ss');
  };

  // Get time difference in a given time unit
  diff(date: Date, unit: moment.unitOfTime.Diff): number {
    return this.date.diff(date.toMoment(), unit);
  }

  static areDatesValid = (dateFrom?: Dayjs, dateTo?: Dayjs) => {
    if (!dateFrom || !dateTo) return true;
    return dateFrom.isBefore(dateTo) || dateFrom.isSame(dateTo);
  };
}

export default Date;
