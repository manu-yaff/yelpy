package yelp

import "example.com/yelpy/business"

func (h Hour) toEntity() business.Hour {
	return business.Hour{
		Start: h.Start,
		End:   h.End,
		Day:   h.Day,
	}
}

func (b BusinessDetail) toEntity() business.BusinessDetailEntity {
	hours := make([]business.Hour, len(b.Hours[0].Open))

	for i, h := range b.Hours[0].Open {
		hours[i] = h.toEntity()
	}

	return business.BusinessDetailEntity{
		Business: business.BusinessEntity{
			Id:          b.Id,
			Name:        b.Name,
			Phone:       b.DisplayPhone,
			Address:     b.Location.FormattedAddress,
			ReviewCount: b.ReviewCount,
			Photos:      b.Photos,
		},
		IsOpen:  b.Hours[0].IsOpen,
		Hours:   hours,
		Reviews: []business.Review{},
	}
}
