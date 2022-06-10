interface Location {
	address1?: string;
	city?: string;
	state?: string;
	country?: string;
};

export interface Business {
	id: string;
	photos: string;
	name: string;
	location: Location;
	review_count: number;
	display_phone: string;
	hasBeenSeen?: boolean;
}

export interface BusinessState {
  currentSearch: Business[];
  seenBusinesses: Business[];
}

export interface SaveBusinessAction {
  type: string;
  payload: Business[];
}

export interface SeeBusinessAction {
	type: string;
	payload: Business;
	list: Business[];
}

export interface CardsListProp {
	businesses: Business[];
}


