import Stripe from "stripe";
import InvoiceService from "../../services/InvoiceService";
import ReservationService from "../../services/ReservationService";
import TransactionService from "../../services/TransactionService";
const stripe = new Stripe(
  "sk_test_51KSnJYGzTAX7NDbOHemTbTzVYXL3iQRrXxmGjPeMDlzazky6dmVmDfkmBxUhgOQGwefLnyYpus854VHNZIUYxnYn00a6KI3l9o"
);

export default async (req, res) => {
  const event = req.body;
  const session = await stripe.checkout.sessions.retrieve(
    event.data.object.id, {
    expand: ["line_items.data.price.product"],
  });
  const line_items = session.line_items.data;
  const reservation = await ReservationService.getByUuidReservation(line_items[0].price.product.metadata.reservationId).then(res => res.data);
  const paidReservation = await ReservationService.paidReservation(reservation.reservationId).then(res => res.data);
  const invoice = await InvoiceService.createInvoice({
    price : paidReservation.totalPrice,
    reservation : paidReservation
  }).then(res => res.data);
  const transaction = await TransactionService.createTransaction({
    invoice : invoice,
    transactionDate : new Date(),
    senderId : paidReservation.user,
    receiverId : paidReservation.property.hostUserUuid
  }).then(res => res.data);
  res.json();
};
