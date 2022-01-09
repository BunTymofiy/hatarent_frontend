import axios from 'axios'
import { url } from '../constants/urls'

const UrlProperty = url + "property"

class PropertyService
{
    getProperties()
    {
        return axios.get(UrlProperty)
    }
    getByUuidProperty(uuid)
    {
        console.log(UrlProperty + "/" + uuid)
        return axios.get(UrlProperty + "/" + uuid)
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
    }
}
export default new PropertyService()