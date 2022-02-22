import { format } from "date-fns";
import Image from "next/image";
import React from "react";

function Transaction({ transaction,userType }) {
  const property = transaction.invoice.reservation.property;
  let type = null;
  if (userType === "guest") 
  {
    type = "Guest";
  } 
  else if (userType === "host") 
  {
    type = "Host";
  }
  return (
    <div className=" flex py-7 px-2 pr-4 border-b transition duration-200 ease-out first:border-t bg-gradient-to-t from-purple-800 to-blue-900 p-3 ">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex flex-shrink-0">
        {property.images.map((image) => (
          <Image
            src={image}
            key={image}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
            priority={true}
          />
        ))}
      </div>

      <div className="flex flex-col flex-grow pl-5 text-gray-200">
        <h4 className="text-2xl font-semibold capitalize " id="title">
          {property.title}
        </h4>
        <div className="flex justify-between flex-grow">
          Transaction Date: {format(new Date(transaction.transactionDate), "dd MMMM yyyy")}
        </div>
        <div className="flex text-sm mt-3 justify-between flex-grow">
          {type} Name: {transaction.user.firstName} {transaction.user.lastName} <br/>
          {type} Email: {transaction.user.email}
        </div>
        <div className="mb-">
          <p className="pt-2 text-sm text-gray-200">
            Check In date:{" "}
            {format(
              new Date(transaction.invoice.reservation.checkInDate),
              "dd MMMM yyyy"
            )}
          </p>
          <p className="pt-2 text-sm text-gray-200 ">
            Check Out date:{" "}
            {format(
              new Date(transaction.invoice.reservation.checkOutDate),
              "dd MMMM yyyy"
            )}
          </p>
        </div>
        <div className="flex justify-between items-end pt-5">
          <div>
            <p className="text-lg font-semibold pb-2 lg:text-2xl">
              Total Paid: {transaction.invoice.price}$
            </p>
            {/* <p className=" font-extralight">Total</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
