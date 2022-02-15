import Stripe from "stripe";
import ReservationService from "../../services/ReservationService";
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
  const paidReservation = await ReservationService.paidReservation(reservation.reservationId);

  res.json();
};
