"use client";

import { useCallback, useEffect, useState } from "react";

const Clock = () => {
  const d = new Date();

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  const padZero = useCallback((num: number) => {
    return num.toString().padStart(2, "0");
  }, []);

  useEffect(() => {
    const time = `${padZero(d.getHours())}:${padZero(d.getMinutes())}:${padZero(d.getSeconds())}`;

    const date = new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "full",
      timeZone: "Asia/Ho_Chi_Minh",
    }).format(d);

    const timer = setInterval(() => {
      setCurrentTime(time);
      setCurrentDate(date);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTime]);

  return (
    <div className="container flex flex-col gap-2">
      <h1 className="text-4xl font-extrabold lg:text-7xl">{currentTime}</h1>
      <p className="text-sky-1 text-lg font-medium lg:text-2xl">
        {currentDate}
      </p>
    </div>
  );
};
export default Clock;
