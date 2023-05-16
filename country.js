export default class Country {
    constructor(_item, _startPreviewCountries, _getNameByCode, _createCountryByCode) {
        this.createStatrtCountries = _startPreviewCountries;
        this.getNameByCode = _getNameByCode;
        this.createCountryByCode = _createCountryByCode;

        this.name = _item.name.common;
        this.pop = _item.population;
        if (this.pop < 1000000) {
            this.population = `${(Math.floor((this.pop / 10000) * 10)).toLocaleString()}K`;
        }
        else if (this.pop < 100000) {
            this.population = `${(Math.floor((this.pop / 100) * 100)).toLocaleString()}`;
        }
        else {
            this.population = `${(Math.floor((_item.population / 1000000) * 100) / 100).toLocaleString()}M`;
        }
        this.languages = _item.languages ? Object.values(_item.languages).join() : "none";
        // if (_item.languages != null) {
        //     Object.values(_item.languages).forEach(val => {
        //         // console.log(val);
        //         this.languages += val + " ";
        //     });
        // }
        this.flag = _item.flags.png;
        this.capital = _item.capital;
        this.map = _item.latlng;
        this.borders = _item.borders;
    }

    render() {
        let myDiv = document.createElement("div");
        document.querySelector(".row").append(myDiv);
        myDiv.style="width: 80%";
        myDiv.innerHTML = `
        <div class="card" data-aos="zoom-out">
        <div class="row p-2 justify-content-around align-items-center">
            <div class="col-5">
                <div>
                    <img src="${this.flag}" alt="${this.name}" style="width:100%;">
                </div>
                <div class="card-body d-md-flex p-0 justify-content-lg-between">
                    <div class="card-text">
                        <h1 class="card-title text-center"><b>${this.name}</b></h1>
                        <p class="card-text"><b>POP: </b>${this.population}</p>
                        <p class="card-text"><b>Capital: </b>${this.capital}</p>
                        <p class="card-text" id="div_borders"><b>This borders: </b></p>
                        <p class="card-text"><b>Languages: </b>${this.languages}</p>
                        <button id="home_btn" class="btn btn-light mb-1 ms-2">Home</button>
                    </div>
                </div>
            </div>
            <div class="col-6 ">
                <iframe class="mt-4 col-12" height="400" src="https://maps.google.com/maps?q=${this.map[0]},${this.map[1]}&z=7&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>
            </div>
            </div>
        </div>
        `;
        if (this.borders) {
            this.borders.forEach(async (item) => {
                if (item != "PSE") {
                    let fullName = await this.getNameByCode(item);
                    let span = document.createElement("span");
                    span.className = "text-danger";
                    span.innerHTML = `${fullName} `;
                    span.style="cursor: pointer";
                    document.querySelector("#div_borders").append(span);
                    span.addEventListener("click", () => {
                        this.createCountryByCode(item);
                    });
                }
            })
        } else {
            document.querySelector("#div_borders").innerHTML += "none"
        }
        let btn = myDiv.querySelector("#home_btn");
        btn.addEventListener("click", () => {
            document.querySelector(".row").innerHTML = "";
            this.createStatrtCountries();
        })
    }

    countryRender() {
        let myDiv = document.createElement("div");
        myDiv.className = "d-flex justify-content-center my-3 text-center";
        document.querySelector(".row").append(myDiv);
        myDiv.style=" cursor: pointer"
        myDiv.className = "col-lg-3 col-sm-5 my-3 mx-2 text-center";
        // document.querySelector(".row").className = "row col-lg-3 col-sm-5 justify-content-around";
        myDiv.innerHTML += `
        <div class="card h-100 preBox" data-aos="zoom-in">
            <img src="${this.flag}" class="card-img-top preImg shadow" width="100%" height: 200px; alt="${this.name}">
            <div class="card-body">
                <h3 class="pnew card-text m-0 p-3"><b>${this.name}</b></h3>
            </div>
        </div>
        `;
        myDiv.querySelector(".preBox").addEventListener("click", () => {
            document.querySelector(".row").innerHTML = "";
            this.render();
        });
    }
}