import axios from 'axios'
import { url } from '../constants/urls'

const UrlProperty = url + "property"

class PropertyService
{
    getProperties()
    {
        return axios.get(UrlProperty)
    }
    getPropertiesByCityDateAndGuest(city, startDate, endDate, numberOfGuests)
    {
        return axios.get(UrlProperty + "/" + city + "/" + startDate + "/" + endDate + "/" + numberOfGuests)
    }
    getByUuidProperty(uuid)
    {
        return axios.get(UrlProperty + "/" + uuid)
    }
    getPropertiesByHost(uuid)
    {
        return axios.get(UrlProperty + "/user/" + uuid)
    }
    createProperty(property)
    {
        return axios.post(UrlProperty, property)
    }
    updateProperty(uuid, property)
    {
        return axios.put(UrlProperty + "/" + uuid, property)
    }
    deleteProperty(uuid)
    {
        return axios.delete(UrlProperty + "/" + uuid)
        // return axios.delete("http://localhost:3000/api/property/" + uuid)
    }
}
export default new PropertyService()