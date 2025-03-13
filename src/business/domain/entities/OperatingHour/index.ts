export type OperatingHourType = {
  start: string
  end: string
  day: number
}

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export class OperatingHour {
  constructor(private data: OperatingHourType) {}

  public formatted(): string {
    return `${WEEKDAYS[this.data.day]} - ${this.formatHour(this.data.start)} - ${this.formatHour(
      this.data.end
    )}`
  }

  private formatHour(hour: string): string {
    return `${hour.slice(0, 2)}:${hour.slice(2, 4)}`
  }
}
