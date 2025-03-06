package yelp

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"

	"example.com/yelpy/business"
)

type HTTPClient interface {
	Do(req *http.Request) (*http.Response, error)
}

type YelpService struct {
	Client HTTPClient
	ApiUrl string
	Token  string
}

type SearchVariables struct {
	SearchTerm string `json:"searchTerm"`
	Location   string `json:"location"`
}

type GraphqlBody struct {
	Query     string          `json:"query"`
	Variables SearchVariables `json:"variables"`
}

type BusinessSearchResponse struct {
	Data struct {
		Search struct {
			Business []BusinessFromYelp `json:"business"`
		} `json:"search"`
	} `json:"data"`
}

type Location struct {
	FormattedAddress string `json:"formatted_address"`
}

type BusinessFromYelp struct {
	Id          string   `json:"id"`
	Name        string   `json:"name"`
	Phone       string   `json:"display_phone"`
	Location    Location `json:"location"`
	ReviewCount int      `json:"review_count"`
}

type BusinessDetailResponse struct {
	Data struct {
		Business BusinessDetailFromYelp `json:"business"`
	} `json:"data"`
}

type HourYelp struct {
	Start string `json:"start"`
	End   string `json:"end"`
	Day   int    `json:"day"`
}

type Hour struct {
	IsOpen bool       `json:"is_open_now"`
	Open   []HourYelp `json:"open"`
}

type User struct {
	ProfileUrl string `json:"profile_url"`
	Name       string `json:"name"`
}

type Review struct {
	Id          string `json:"id"`
	Rating      int    `json:"rating"`
	Text        string `json:"text"`
	TimeCreated string `json:"time_created"`
	User        User   `json:"user"`
}

type BusinessDetailFromYelp struct {
	Id           string   `json:"id"`
	Name         string   `json:"name"`
	DisplayPhone string   `json:"display_phone"`
	ReviewCount  int      `json:"review_count"`
	Rating       float32  `json:"rating"`
	Hours        []Hour   `json:"hours"`
	Photos       []string `json:"photos"`
	Reviews      []Review `json:"reviews"`
	Location     Location `json:"location"`
}

func (y YelpService) SearchByTermAndLocation(term, location string) ([]BusinessFromYelp, error) {
	// create the request
	requestBody := GraphqlBody{
		Query: searchBusinessQuery,
		Variables: SearchVariables{
			SearchTerm: term,
			Location:   location,
		},
	}

	jsonBody, err := json.Marshal(requestBody)
	if err != nil {
		return []BusinessFromYelp{}, errors.New("Error converting request body to json string")
	}

	request, err := http.NewRequest(http.MethodPost, y.ApiUrl, bytes.NewBuffer(jsonBody))
	if err != nil {
		return []BusinessFromYelp{}, errors.New("Error creating http request")
	}

	request.Header.Add("Authorization", fmt.Sprintf("Bearer %s", y.Token))
	request.Header.Add("Content-Type", "application/json")

	// send the request
	response, err := y.Client.Do(request)
	if err != nil {
		fmt.Println(err)
		return []BusinessFromYelp{}, errors.New("Error sending the http request")
	}

	defer response.Body.Close()

	// read the bytes from the request
	bytes, err := io.ReadAll(response.Body)
	if err != nil {
		return []BusinessFromYelp{}, errors.New("Error reading response content")
	}

	if response.StatusCode != http.StatusOK {
		fmt.Println(string(bytes))
		return []BusinessFromYelp{}, errors.New("Error, request code is different than 200")
	}

	// convert to struct
	var businessResponse BusinessSearchResponse
	err = json.Unmarshal(bytes, &businessResponse)

	if err != nil {
		return []BusinessFromYelp{}, errors.New("Error converting json response to struct")
	}

	return businessResponse.Data.Search.Business, nil
}

func (y YelpService) GetBusinessDetail(id string) (business.BusinessDetailEntity, error) {
	graphqlVariables := struct {
		Query     string `json:"query"`
		Variables struct {
			Id string `json:"id"`
		}
	}{
		Query: "this is the query",
		Variables: struct {
			Id string `json:"id"`
		}{
			Id: "1",
		},
	}

	jsonBody, err := json.Marshal(graphqlVariables)

	if err != nil {
		return business.BusinessDetailEntity{}, err
	}

	request, err := http.NewRequest(http.MethodPost, "this.url", bytes.NewBuffer(jsonBody))
	if err != nil {
		return business.BusinessDetailEntity{}, err
	}

	// send the request
	response, err := y.Client.Do(request)
	if err != nil {
		return business.BusinessDetailEntity{}, err
	}

	defer response.Body.Close()

	responseData, err := io.ReadAll(response.Body)
	if err != nil {
		return business.BusinessDetailEntity{}, err
	}

	if response.StatusCode != 200 {
		fmt.Println("status code is different than 200", responseData)
		return business.BusinessDetailEntity{}, errors.New("Status code is not 200")
	}

	var businessDetailFromYelp BusinessDetailResponse
	jsonErr := json.Unmarshal(responseData, &businessDetailFromYelp)

	if jsonErr != nil {
		fmt.Println(jsonErr)
	}

	// adapt the response
	business := businessDetailFromYelp.Data.Business.Adapt()

	return business, nil
}

func (b BusinessDetailFromYelp) Adapt() business.BusinessDetailEntity {
	hours := make([]business.Hour, len(b.Hours[0].Open))

	for i, h := range b.Hours[0].Open {
		hours[i] = business.Hour{
			Start: h.Start,
			End:   h.End,
			Day:   h.Day,
		}
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
