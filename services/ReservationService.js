import axios from "axios";
import { url } from "../constants/urls";

const UrlReservation = url + "reservation";

class ReservationService {
  getReservations() {
    return axios.get(UrlReservation);
  }
  getReservationsByUser(uuid) {
    return axios.get(UrlReservation + "/user/" + uuid);
  }
  getReservationsByHost(uuid) {
    return axios.get(UrlReservation + "/host/" + uuid);
  }
  getByUuidReservation(uuid) {
    return axios.get(UrlReservation + "/" + uuid);
  }
  getReservationsByProperty(uuid) {
    return axios.get(UrlReservation + "/property/" + uuid);
  }
  createReservation(reservation) {
    return axios.post(UrlReservation, reservation);
  }
  updateReservation(uuid, reservation) {
    return axios.put(UrlReservation + "/" + uuid, reservation);
  }
  deleteReservation(uuid) {
    return axios.delete(UrlReservation + "/" + uuid);
  }
  acceptReservation(uuid) {
    return axios.put(UrlReservation + "/accept/" + uuid, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  declineReservation(uuid) {
    return axios.put(UrlReservation + "/decline/" + uuid, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  paidReservation(uuid) {
    return axios.put(UrlReservation + "/pay/" + uuid, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
export default new ReservationService();
