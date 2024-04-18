import React, { useState } from "react";
import Pagination from "./Pagination";
function StockInfo({ stockData, itemsPerPage=5 }) {
  const [startIndex, setstartIndex] = useState(0);
  const endIndex =  startIndex+ itemsPerPage;
  const currentItems = stockData.info.slice(startIndex, endIndex);
  return (
    <div className="flex flex-col w-full mb-8 overflow-hidden rounded-lg shadow-lg dark:bg-slate-700 ">
      <div className=" overflow-x-auto ">
        <table  className="min-w-full">
          <caption className="font-semibold text-white text-xl py-2">
            {stockData.stockName}
          </caption>
          <thead className="bg-gray-50 dark:bg-slate-400 text-slate-600  ">
            <tr className="border-b border-gray-600">
              <th className="px-4 py-2 text-left dark:text-white">#</th>
              <th className="px-4 py-2 text-left dark:text-white">Day</th>
              <th className="px-4 py-2 text-left dark:text-white">Opening Price</th>
              <th className="px-4 py-2 text-left dark:text-white">Closing Price</th>
            </tr>
          </thead>
          <tbody id="tableBody" className="text-gray-600 dark:bg-slate-700">
            {/* Map through the stock data and create a new row for each day */}
            {currentItems?.map((day, idx, arr) => (
              <tr key={day.date}>
                <td className="px-4 py-2 dark:text-neutral-200 border  border-slate-800">{idx}</td>
                <td className="px-4 py-2 dark:text-neutral-200 border  border-slate-800">{day.date}</td>
                <td
                  className={`px-4 py-2 ${
                    idx === 0 || arr[idx - 1]["close"] === day["open"]
                      ? ""
                      : arr[idx - 1]["close"] < day["open"]
                      ? "bg-green-400"
                      : "bg-red-400"
                  } dark:text-neutral-200 border  border-slate-800`}
                >
                  {day.open}
                </td>
                {/* change closing price color to green if opening price less than closing price and red if opening price greater than closing price otherwise remain as it is*/}
                <td
                  className={`px-4 py-2 ${
                    day.close === day.open
                      ? ""
                      : day.close > day.open
                      ? "bg-green-400"
                      : "bg-red-400"
                  } dark:text-neutral-200 border border-slate-800`}
                >
                  {day.close}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </div>
          <div className="py-2 px-4">
          <Pagination items={stockData?.info} itemsPerPage={itemsPerPage}   setStartIndex={setstartIndex} />
        </div>
    </div>
  );
}

export default StockInfo;
