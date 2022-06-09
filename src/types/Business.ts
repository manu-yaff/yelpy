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

}

export interface BusinessProps extends Business {
	hey: Business;
  children?: React.ReactNode;
}

export interface CardsListProp {
	businesses: Business[];
}


