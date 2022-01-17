import axios from 'axios'
import { url } from '../constants/urls'

const UrlLogin = url + "property"
const UrlRegister = url + "property"
const UrlLogin = url + "property"


class AuthService
{
    login(username, password)
    {
        return axios.get(UrlProperty)
    }
    register(uuid)
    {
        console.log(UrlProperty + "/" + uuid)
        return axios.get(UrlProperty + "/" + uuid)
    }
}
export default new AuthService()