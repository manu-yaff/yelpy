package yelp

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"reflect"
	"testing"

	"example.com/yelpy/business"
)

type MockClient struct {
	graphqlQuery string
}

func (m *MockClient) Do(req *http.Request) (*http.Response, error) {
	return &http.Response{
		StatusCode: http.StatusOK,
		Body:       io.NopCloser(bytes.NewBufferString(m.graphqlQuery)),
		Header:     make(http.Header),
	}, nil
}

func TestBusinessSearch(t *testing.T) {
	business := Business{
		Id:           "123",
		Name:         "Test Business",
		DisplayPhone: "+1 123-456-7890",
		ReviewCount:  100,
	}

	want := []Business{business}

	client := MockClient{graphqlQuery: BusinessSearchResponseMock}
	service := YelpService{Client: &client, ApiUrl: "https://test.com", Token: "test-token"}

	got, err := service.SearchByTermAndLocation("tacos", "san francisco")

	if err != nil {
		t.Errorf("got error but didn't expect one %v", err)
	}

	if !reflect.DeepEqual(got, want) {
		fmt.Println(got)
		t.Errorf("got %v but want %v", got, want)
	}
}

func TestBusinessDetail(t *testing.T) {
	client := MockClient{graphqlQuery: BusinessDetailResponseMock}
	service := YelpService{Client: &client, ApiUrl: "https://test.com", Token: "test-token"}

	got, err := service.GetBusinessDetail("test-id")

	want := business.BusinessDetailEntity{
		Business: business.BusinessEntity{
			Id:          "FbLIxBVJAxAZPgKJsAuVSA",
			Name:        "Tacos El Tucan",
			Phone:       "(415) 552-2515",
			Address:     "3600 16th St San Francisco, CA 94114",
			ReviewCount: 93,
			Photos:      []string{"https://s3-media1.fl.yelpcdn.com/bphoto/GbzEtJkQXQ4owxmaVNhQFg/o.jpg"},
		},
		IsOpen: false,
		Hours: []business.Hour{
			{Start: "1100", End: "2100", Day: 1},
		},
		Reviews: []business.Review{},
	}

	fmt.Println("*******************")

	if err != nil {
		t.Errorf("got error but didn't expect one %v", err)
	}

	if !reflect.DeepEqual(got, want) {
		t.Errorf("got %+v but want %+v", got, want)
	}
}
