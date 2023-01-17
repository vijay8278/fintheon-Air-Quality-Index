# Air Quality Index

## Description
* This is a simple project made using only HTML, CSS and Javascript as we are only dealing with basic API calls.
* Given the name of the city as input, The Air Quality Index details of corresponding city is displayed.
* ___Caching of API responses is performed for input cities to make server efficient___

## Procedure:
    1. Just open the home.html using browser like Google chrome, Firefox, Microsoft edge etc
    2. Enter the city name in search box or select from the auto-complete suggestions provided 
    3. Click on search icon 
    4. AQI is displayed depending on the availability of data of the input city

## Additional Features:
    * Search Bar with autocompleting city name suggestions.

## APIs used:
    - Geoapify API is used to get possible matches while city name is being typed to facilitate
      auto-complete suggestions. API is used instead of storing cities statically to avoid the inconsistencies
      that may come forth because of change of names in future
    - aqicn API is used as recommended for feeding Air quality index of city

## Possible Extensions:
    - Auto-complete suggestions can be improved using better geo API like google places API for which free trial is available
    - Validation of input whether it's a valid City depends on API, So Validation can be improved by using better API (paid). 
    - Map API can be added to make it even more interactive and more robust as aqicn API feed
      is not responding correctly for some of the cities.

# Author: K vijay babu