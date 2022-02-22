import axios from 'axios'
import { url } from '../constants/urls'

const UrlInvoice = url + "invoice"

class InvoiceService
{
    getInvoice()
    {
        return axios.get(UrlInvoice)
    }
    getByUuidInvoice(uuid)
    {
        return axios.get(UrlInvoice + "/" + uuid)
    }
    createInvoice(invoice)
    {
        return axios.post(UrlInvoice, invoice)
    }
    updateInvoice(uuid, invoice)
    {
        return axios.put(UrlInvoice + "/" + uuid, invoice)
    }
    deleteInvoice(uuid)
    {
        return axios.delete(UrlInvoice + "/" + uuid)
    }
}
export default new InvoiceService()