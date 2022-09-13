const axios = require('axios')

class AxiosCarsInfo {
    constructor(){
        this.axios = axios.create({
            baseURL: 'https://api.api-ninjas.com/v1',
            headers: {
                'X-Api-Key': 'mNqIWshj/WoX8xdI+jWvVg==BXMQrt7uhMy0nEj3'
            }
        })
    }

    getCarBrand(brand){
        return this.axios.get(`/cars?limit=30&make=${brand}`)
        .then((res) => res.data)
    }

    getCarModel(model){
        return this.axios.get(`/cars?limit=30&model=${model}`)
        .then((res) => res.data)
    }

    getCarsByYear(year){
        return this.axios.get(`/cars?limit=30&year=${year}`)
        .then((res) => res.data)
    }

    getCarsByFuelType(fuel){
        return this.axios.get(`/cars?limit=30&fuel_type=${fuel}`)
        .then((res) => res.data)
    }
}

module.exports = AxiosCarsInfo;
