package yelp

const BusinessDetailResponseMock = `{
  "data":{
    "business":{
      "id":"FbLIxBVJAxAZPgKJsAuVSA",
      "name":"Tacos El Tucan",
      "display_phone":"(415) 552-2515",
      "review_count":93,
      "rating":4.3,
      "hours":[
        {
          "is_open_now":false,
          "open":[
            {
              "end":"2100",
              "start":"1100",
              "day":1
            }
          ]
        }
      ],
      "photos":[
        "https://s3-media1.fl.yelpcdn.com/bphoto/GbzEtJkQXQ4owxmaVNhQFg/o.jpg"
      ],
      "reviews":[
        {
          "id":"Yew0231eUBgoCxrZwZlDwA",
          "rating":5,
          "text":"Tacos El Tucan has two locations in the Bay Area with their first in Richmond and this newer one in San Francisco. It's located near the corner of a busy...",
          "time_created":"2024-11-25 18:08:03",
          "user":{
            "profile_url":"https://www.yelp.com/user_details?userid=_jqTa-3-fqmBxnkANJHtFw",
            "name":"Brian F."
          }
        }
      ],
      "location":{
        "formatted_address":"3600 16th St San Francisco, CA 94114"
      }
    }
  }
}`
