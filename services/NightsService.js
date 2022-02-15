import axios from 'axios'
import { url } from '../constants/urls'

const UrlNights = url + "nights"

class NightsService {
    getNights() {
        return axios.get(UrlNights)
    }
    getByUuidNights(uuid) {
        return axios.get(UrlNights + "/" + uuid)
    }
    getNightsByReservation(reservationId) {
        return axios.get(UrlNights + "/reservation/" + reservationId)
    }
    createNightsBulk(nights) {
        return axios.post(UrlNights + "/bulk", nights)
    }
    createNights(nights) {
        return axios.post(UrlNights, nights)
    }
    updateNightsBulk(reservationId) {
        return axios.put(UrlNights + "/bulk/" + reservationId,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    updateNights(uuid, nights) {
        return axios.put(UrlNights + "/" + uuid, nights)
    }
    deleteNightsBulk(reservationId) {
        return axios.delete(UrlNights + "/bulk/" + reservationId)
    }
    deleteNights(uuid) {
        return axios.delete(UrlNights + "/" + uuid)
    }
}
export default new NightsService()