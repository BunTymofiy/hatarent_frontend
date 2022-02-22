import axios from 'axios'
import { url } from '../constants/urls'

const UrlUser = url + "user"
const UrlRegister = url + "property"
const UrlLogin = url + "property"
const UrlLogout = url + "logout"

class AuthService
{
    login(username, password)
    {
        return axios.get(UrlProperty)
    }
    register(uuid)
    {
        return axios.get(UrlProperty + "/" + uuid)
    }
    getUser()
    { 
        try {
        return axios.get(UrlUser, {withCredentials:true})
        } catch (e) {
            return null
        }
    }
    logout()
    {
        return axios.head(url + 'logout',{withCredentials:true})
    }
    getUserByUuid(uuid)
    {
        return axios.get(UrlUser + "/info/" + uuid)
    }
}
export default new AuthService()