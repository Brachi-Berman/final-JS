import Country from "./country.js";

let allCountries_ar = [];
const startCountries = ["israel", "united states", "france", "thailand", "united kingdom"];

export const createCountry = (_input) => {
    document.querySelector(".row").innerHTML = "";

    let arr = allCountries_ar.filter((item) =>
        item.name.common.toLowerCase().includes(_input.toLowerCase())
    );
    if (arr.length > 0) {
        arr.forEach((item) => {
            let country = new Country(item, createStatrtCountries, getNameByCode, createCountryByCode);
            country.countryRender();
        });
    } else {
        document.querySelector(".row").innerHTML = `<h2>Country ${_input} is not found</h2>`;
    }
    document.querySelector("#id_load").classList.add("d-none");
    if (arr[0] != null) {
        return arr[0].name.common
    }
};



export const createAllCountry = () => {
    document.querySelector(".row").innerHTML = "";

    allCountries_ar.forEach((item) => {
        let country = new Country(item, createStatrtCountries, getNameByCode, createCountryByCode);
        country.countryRender();
    });
    document.querySelector("#id_load").classList.add("d-none");
};

export const createCountryByCode = (_input) => {
    document.querySelector(".row").innerHTML = "";
    let arr = allCountries_ar.filter((item) =>
        item.cca3.toLowerCase().includes(_input.toLowerCase())
    );
    if (_input === "" || _input === " ") {
        alert("empty");
    } else if (arr.length > 0) {
        arr.forEach((item) => {
            let country = new Country(item, createStatrtCountries, getNameByCode, createCountryByCode);
            country.render();
        });
    } else {
        document.querySelector(".row").innerHTML = `<h2>The country ${_input} is not found</h2>`;
    }
    document.querySelector("#id_load").classList.add("d-none");
};

export const getCountries = (_data) => {
    allCountries_ar = _.sortBy(_data, "name.common");
};

export const getNameByCode = async (_code) => {
    let url = `https://restcountries.com/v3.1/alpha/${_code}`;
    let resp = await fetch(url);
    let data = await (resp.json());
    return data[0].name.common;
};

export const createStatrtCountries = () => {
    document.querySelector("#id_load").classList.add("d-none");
    let tmp = allCountries_ar.filter((item) =>
        startCountries.includes(item.name.common.toLowerCase())
    );
    console.log(tmp)
    tmp.forEach((item) => {
        let country = new Country(item, createStatrtCountries, getNameByCode, createCountryByCode);
        country.countryRender();
    });
};

export const fillSelectBox = () => {
    let select = document.querySelector("#_select");
    console.log(allCountries_ar);
    allCountries_ar.forEach((item) => {
        select.innerHTML += `<option value="${item.name.common}">${item.name.common}</option>`;
    });
};
