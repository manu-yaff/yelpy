export type OperatingHourType = {
  start: string
  end: string
  day: number
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export class OperatingHour {
  constructor(private data: OperatingHourType) {}

  public formatted(): { day: string; start: string; end: string } {
    return {
      day: WEEKDAYS[this.data.day],
      start: this.formatHour(this.data.start),
      end: this.formatHour(this.data.end),
    }
  }

  private formatHour(hour: string): string {
    return `${hour.slice(0, 2)}:${hour.slice(2, 4)}`
  }
}
