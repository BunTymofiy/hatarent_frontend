import { format } from "date-fns";
import Stripe from "stripe";
import ReservationService from "../../services/ReservationService";
const stripe = new Stripe("sk_test_51KSnJYGzTAX7NDbOHemTbTzVYXL3iQRrXxmGjPeMDlzazky6dmVmDfkmBxUhgOQGwefLnyYpus854VHNZIUYxnYn00a6KI3l9o");

export default async (req, res) => {
    const {reservationId} = req.body;
    const reservation = await ReservationService.getByUuidReservation(reservationId).then(res => res.data);

    try{
        const session = await stripe.checkout.sessions.create({
            success_url:"http://localhost:3000/guest-reservations?id=${CHECKOUT_SESSION_ID}",
            cancel_url:"http://localhost:3000/guest-reservations",
            mode: "payment",
            payment_method_types: ["alipay","card"],
            line_items: [{
                price_data: {
                    unit_amount_decimal: parseFloat(reservation.totalPrice*100),
                    currency: "CAD",
                    product_data: {
                        name: reservation.property.title,
                        description: "Reservation for " + reservation.property.title + " on " + format(new Date(reservation.checkInDate), "dd MMMM yyyy")  + " to " + format(new Date(reservation.checkOutDate), "dd MMMM yyyy"),
                        metadata: {
                            reservationId: reservation.reservationId
                        }
                    }
                },
                quantity: 1,
         }]});
         res.json(session);
         return;
    }
    catch(err){
        res.json({error: {message: err}});
        return;
    }
}