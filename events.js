import { createCountry,createAllCountry, createCountryByCode, createStatrtCountries } from "./countryManager.js";

export const declareEvaents = () => {
    let form = document.querySelector("form");
    let home = document.querySelector("#_home");
    let all = document.querySelector("#_all");
    let select = document.querySelector("#_select");
    let input_search = document.querySelector("#_input");
    let israel = document.querySelector("#_israel");
    let USA = document.querySelector("#_USA");
    let france = document.querySelector("#_france");
    let UK = document.querySelector("#_uk");
    let thailand = document.querySelector("#_thailand");
    let parent = document.querySelector(".row");

    israel.addEventListener("click", () => {
        parent.innerHTML = "";
        createCountryByCode("isr");
    })
    USA.addEventListener("click", () => {
        parent.innerHTML = "";
        createCountryByCode("usa");
    })
    france.addEventListener("click", () => {
        parent.innerHTML = "";
        createCountryByCode("fra");
    })
    UK.addEventListener("click", () => {
        parent.innerHTML = "";
        createCountryByCode("gbr");
    })
    thailand.addEventListener("click", () => {
        parent.innerHTML = "";
        createCountryByCode("tha");
    })
    form.addEventListener("submit", e => {
        e.preventDefault();
        createCountry(input_search.value);
    })
    home.addEventListener("click", () => {
        parent.innerHTML = "";
        createStatrtCountries();
    })
    all.addEventListener("click",()=>{
        createAllCountry();
    })
    select.addEventListener("change", () => {
        if (select.value != "0") {
            createCountry(select.value);
        }
    })
}