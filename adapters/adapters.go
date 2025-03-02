package adapters

import (
	"example.com/yelpy/business"
	"example.com/yelpy/yelp"
)

func BusinessFromYelp(y yelp.Business) business.Business {
	return business.Business{
		Id:           y.Id,
		Name:         y.Name,
		Phone:        y.Display_phone,
		Address:      y.Location.Formatted_address,
		ReviewsCount: y.Review_count,
		Photos:       y.Photos,
	}
}
