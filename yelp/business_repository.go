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

func (y YelpService) SearchByTermAndLocation(term, location string) ([]Business, error) {
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
		return []Business{}, errors.New("Error converting request body to json string")
	}

	request, err := http.NewRequest(http.MethodPost, y.ApiUrl, bytes.NewBuffer(jsonBody))
	if err != nil {
		return []Business{}, errors.New("Error creating http request")
	}

	request.Header.Add("Authorization", fmt.Sprintf("Bearer %s", y.Token))
	request.Header.Add("Content-Type", "application/json")

	// send the request
	response, err := y.Client.Do(request)
	if err != nil {
		fmt.Println(err)
		return []Business{}, errors.New("Error sending the http request")
	}

	defer response.Body.Close()

	// read the bytes from the request
	bytes, err := io.ReadAll(response.Body)
	if err != nil {
		return []Business{}, errors.New("Error reading response content")
	}

	if response.StatusCode != http.StatusOK {
		fmt.Println(string(bytes))
		return []Business{}, errors.New("Error, request code is different than 200")
	}

	// convert to struct
	var businessResponse BusinessSearchResponse
	err = json.Unmarshal(bytes, &businessResponse)

	if err != nil {
		return []Business{}, errors.New("Error converting json response to struct")
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
	business := businessDetailFromYelp.Data.Business.toEntity()

	return business, nil
}
