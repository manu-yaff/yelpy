export interface Day {
	start: string;
	end: string;
	day: number;
}

export interface Hour {
	is_open_now: boolean;
	open: Day[];
}

export interface OpenHoursProps {
	hours: Hour;
};
