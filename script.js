const searchBar = document.querySelector(".input-search");
const cityInputElement = searchBar.querySelector("input");
const suggestionsBox = searchBar.querySelector(".autocomplete-box");
const searchIcon = searchBar.querySelector(".search_icon");
let cache = {};
let latest_inp_city;
let cache_updated;

// if user presses any key and release
cityInputElement.onkeyup = (e) => {
    let input_city = e.target.value;
    let suggestions_html = [];
    if (input_city) {
        searchIcon.onclick = () => {
            feed_data(input_city);
        }
        let api_key = `36c0a84025e14ada96be8e603240f194`;
        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${input_city}&lang=en&type=city&format=json&apiKey=${api_key}`)
            .then(response => response.json())
            .then(function (result) {
                let suggested_names = [...new Set(result.results.map(a => a.city).filter(Boolean))];
                suggestions_html = suggested_names.map((data) => {
                    return `<li>${data}</li>`;
                });
                searchBar.classList.add("active");
                displaySuggestions(suggestions_html);
                let allList = suggestionsBox.querySelectorAll("li");
                for (let i = 0; i < allList.length; i++) {
                    allList[i].setAttribute("onclick", "select(this)");
                }
            })
            .catch(error => console.log('error', error));
    } else {
        searchBar.classList.remove("active"); //hide autocomplete box
    }
}

function feed_data(input_city) {
    let city_preprocessed = input_city.split(" ").join("").toLowerCase();
    let empty_card = `<div style='border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;border:1px solid #D6D6D6;display:inline-block;background-color:#fff;-webkit-box-shadow: 1px 1px 1px 0 rgba(0,0,0,0.075);;' id='details-aqi-popup-0'><div style='width:180px;margin:8px;border:0 solid black;line-height:1.2;color:black;'>
                        <div style='width:180px;overflow:hidden;font-size:12px;text-align:left;padding:2px 0;'>
                        <b>${input_city}</b> Air Quality.
                        </div>
                        <div style='padding:5px 0;background-color: #aaaaaa;color:#eeeeee; border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;;'>
                        <div style='font-size:28px;'>-</div>
                        <div style='font-size:18px;'>no data</div>
                        </div>
                        <div style='font-size:12px;margin:5px 0;color:#888;'>Never updated!</div>
                        </>
                        <table style='padding:0;margin:0;border-spacing: 0;border:1px solid #eee;border-radius:3px;-moz-border-radius:3px;-webkit-border-radius:3px;width:100%;'> </table></div><div style='padding:0 3px 10px 3px;font-size:9px;color:#888;line-height:1.2;text-align:center;width:180px;;display:none;' class='aqi-attribution' id='attribution-aqi-popup-0'>Data monitored by . Click for more information.</div></div>`;
    if (city_preprocessed in cache) {
        if (cache[city_preprocessed] === undefined) {
            $("#city-aqi-container").html(empty_card);
        } else {
            $("#city-aqi-container").html(cache[city_preprocessed]);
        }
    } else {
        latest_inp_city = city_preprocessed;
        cache_updated = false;
        _aqiFeed({city: city_preprocessed, callback: update_cache});
        if (!cache_updated) {
            cache[city_preprocessed] = undefined;
            $("#city-aqi-container").html(empty_card);
        }
    }
}

function select(element) {
    let input_city = element.textContent;
    cityInputElement.value = input_city;
    searchIcon.onclick = () => {
        feed_data(input_city);
    }
    searchBar.classList.remove("active");
}


function update_cache(aqi) {
    $("#city-aqi-container").html(aqi.details);
    cache[latest_inp_city] = aqi.details;
    cache_updated = true;
}

function displaySuggestions(autoCompleteSuggestions) {
    let dropDownlistData;
    if (!autoCompleteSuggestions.length) {
        dropDownlistData = `<li>${cityInputElement.value}</li>`;
    } else {
        dropDownlistData = autoCompleteSuggestions.join('');
    }
    suggestionsBox.innerHTML = dropDownlistData;
}