package yelp

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"reflect"
	"testing"
)

const mockJsonResponse = `{
   "data": {
      "search": {
        "business": [
           {
             "id": "123",
             "name": "Test Business",
             "display_phone": "+1 123-456-7890",
             "review_count": 100
           }
        ]
      }
   }
}`

type MockClient struct{}

func (m *MockClient) Do(req *http.Request) (*http.Response, error) {
	return &http.Response{
		StatusCode: http.StatusOK,
		Body:       io.NopCloser(bytes.NewBufferString(mockJsonResponse)),
		Header:     make(http.Header),
	}, nil
}

func TestBusinessSearch(t *testing.T) {
	business := BusinessFromYelp{
		Id:          "123",
		Name:        "Test Business",
		Phone:       "+1 123-456-7890",
		ReviewCount: 100,
	}

	want := []BusinessFromYelp{business}

	client := MockClient{}
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
