import axios from "axios";
import { url } from "../constants/urls";

const UrlTransaction = url + "transaction";

class TransactionService {
  getTransactions() {
    return axios.get(UrlTransaction);
  }
  getTransactionsByUser(uuid) {
    return axios.get(UrlTransaction + "/user/" + uuid);
  }
  getTransactionsByHost(uuid) {
    return axios.get(UrlTransaction + "/host/" + uuid);
  }
  getByUuidTransaction(uuid) {
    return axios.get(UrlTransaction + "/" + uuid);
  }
  createTransaction(transaction) {
    return axios.post(UrlTransaction, transaction);
  }
  updateTransaction(uuid, transaction) {
    return axios.put(UrlTransaction + "/" + uuid, transaction);
  }
  deleteTransaction(uuid) {
    return axios.delete(UrlTransaction + "/" + uuid);
  }
}
export default new TransactionService();
