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

type YelpGraphqlRepository struct {
	Client HTTPClient
	ApiUrl string
	Token  string
}

type SearchVariables struct {
	SearchTerm string `json:"searchTerm"`
	Location   string `json:"location"`
}

func (y YelpGraphqlRepository) sendQuery(query string, variables map[string]interface{}) (*http.Response, error) {
	requestBody := GraphqlBody{
		Query:     query,
		Variables: variables,
	}

	jsonBody, err := json.Marshal(requestBody)

	if err != nil {
		fmt.Println("error when converting body to JSON")
	}

	request, err := http.NewRequest(http.MethodPost, y.ApiUrl, bytes.NewBuffer(jsonBody))

	if err != nil {
		fmt.Println("error creating the request")
	}

	request.Header.Add("Authorization", fmt.Sprintf("Bearer %s", y.Token))
	request.Header.Add("Content-Type", "application/json")

	response, err := y.Client.Do(request)
	if err != nil {
		fmt.Println("error sending the request")
	}

	return response, nil
}

func (y YelpGraphqlRepository) SearchByTermAndLocation(term, location string) ([]Business, error) {
	variables := map[string]any{
		"term":     term,
		"location": location,
	}

	response, err := y.sendQuery(searchBusinessQuery, variables)

	if err != nil {
		fmt.Println("error received while sending the request")
	}

	if response.StatusCode != http.StatusOK {
		return []Business{}, errors.New("Error, request code is different than 200")
	}

	defer response.Body.Close()

	responseContent, err := io.ReadAll(response.Body)

	var businessResponse BusinessSearchResponse
	jsonErr := json.Unmarshal(responseContent, &businessResponse)

	if jsonErr != nil {
		return []Business{}, errors.New("Error converting json response to struct")
	}

	return businessResponse.Data.Search.Business, nil
}

func (y YelpGraphqlRepository) GetBusinessDetail(id string) (business.BusinessDetailEntity, error) {
	variables := map[string]any{
		"id": id,
	}

	response, err := y.sendQuery(businessDetailQuery, variables)

	if err != nil {
		fmt.Println("error while sending request")
	}

	defer response.Body.Close()

	responseContent, err := io.ReadAll(response.Body)

	if err != nil {
		return business.BusinessDetailEntity{}, err
	}

	if response.StatusCode != 200 {
		fmt.Println("status code is different than 200", responseContent)
		return business.BusinessDetailEntity{}, errors.New("Status code is not 200")
	}

	var businessDetailFromYelp BusinessDetailResponse
	jsonErr := json.Unmarshal(responseContent, &businessDetailFromYelp)

	if jsonErr != nil {
		fmt.Println(jsonErr)
	}

	business := businessDetailFromYelp.Data.Business.toEntity()

	return business, nil
}
