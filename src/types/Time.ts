export interface Day {
  day: number;
  start: string;
  end: string;
}

export interface Hour {
  is_open_now: boolean;
  open: Day[];
}