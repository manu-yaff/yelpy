package adapters

import (
	"reflect"
	"testing"

	"example.com/yelpy/business"
	"example.com/yelpy/yelp"
)

func TestBusinessFromApiToBusiness(t *testing.T) {

	given := yelp.Business{
		Id:            "1",
		Name:          "tacos san juan",
		Display_phone: "123456789",
		Review_count:  10,
		Photos: []string{
			"photo1",
			"photo2",
		},
		Location: struct {
			Formatted_address string
		}{
			Formatted_address: "san juan",
		},
	}

	got := BusinessFromYelp(given)

	want := business.Business{
		Id:           "1",
		Name:         "tacos san juan",
		Phone:        "123456789",
		Address:      "san juan",
		ReviewsCount: 10,
		Photos: []string{
			"photo1",
			"photo2",
		},
	}

	if !reflect.DeepEqual(got, want) {
		t.Errorf("got %v but want %v given %v", got, want, given)
	}
}
