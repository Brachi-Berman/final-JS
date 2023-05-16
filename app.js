import { getCountries, fillSelectBox, createStatrtCountries } from "./countryManager.js";
import { declareEvaents } from "./events.js";

const init = () => {
    doApi();
    declareEvaents();
}

const doApi = async () => {
    let url = "https://restcountries.com/v3.1/all";
    let resp = await fetch(url);
    let data = await resp.json();
    console.log(data);
    data = data.filter(item => item.name.common != "Palestine")
    getCountries(data);
    createStatrtCountries();
    fillSelectBox();
};

init();