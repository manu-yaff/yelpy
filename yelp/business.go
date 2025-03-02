package yelp

type Business struct {
	Id            string
	Name          string
	Display_phone string
	Photos        []string
	Location      struct {
		Formatted_address string
	}
	Review_count int
}
