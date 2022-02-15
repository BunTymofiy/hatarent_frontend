import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { takeMonth } from "../helper/CalendarUtils";
import { addMonths, format, isSameDay, isSameMonth, subMonths } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
function WeekNames() {
  function cornerClassName(i) {
    if (i === 0) return "rounded-tl-lg";
    if (i === 6) return "rounded-tr-lg";
  }
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="grid grid-cols-7">
      {dayNames.map((dayName, i) => (
        <div
          key={dayName}
          className={` flex items-center justify-center border text-gray-200 border-blue-200 ${cornerClassName(
            i
          )}`}
        >
          {dayName}
        </div>
      ))}
    </div>
  );
}

function HostCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const data = takeMonth(selectedDate)();

  const addAMonth = async () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };
  const subAMonth = async () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };
  function dayColor(day) {
    if (!isSameMonth(day, selectedDate)) return "text-gray-200";
    if (isSameDay(day, selectedDate)) return "bg-gray-300 bg-opacity-30";
  }
  function cornerClassName(weekIndex, dayIndex) {
    if (weekIndex !== data.length - 1) return;
    if (dayIndex === 0) return "rounded-bl-lg";
    if (dayIndex === 6) return "rounded-br-lg";
  }
  const loadBlockedDays = async () => {
  
};
  return (
    <div className="h-screen">
      <Header user={user} />
      <main>
        <div className="card  h-full">
          <div className="glass box-border m-8 h-[70vh] card flex justify-center rounded-2xl">
            <div className="text-gray-100 justify-between  flex">
              <div className="">
                <button onClick={subAMonth} className="">
                  <ChevronLeftIcon className="h-16 hover:shadow-xl hover:scale-105" />
                </button>
              </div>{" "}
              <div className="text-4xl ">
                {format(selectedDate, "MMMM, yyyy")}
              </div>{" "}
              <div className="">
                <button onClick={addAMonth} className=" ">
                  <ChevronRightIcon className="h-16 hover:shadow-xl hover:scale-105" />
                </button>
              </div>
            </div>
            <div className="border rounded-md">
              {" "}
              <WeekNames />
              {data.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7">
                  {week.map((day, di) => (
                    <div
                      onClick={() => setSelectedDate(day)}
                      // onDoubleClick={}
                      key={day}
                      className={`p-4 border lg:h-32 hover:scale-105 hover:bg-slate-600 border-blue-200 ${dayColor(
                        day
                      )} ${cornerClassName(wi, di)}, ${loadBlockedDays()}`}
                    >
                      {format(day, "dd")}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HostCalendar;
