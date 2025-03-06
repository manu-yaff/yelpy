package yelp

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
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
