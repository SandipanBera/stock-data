import React, { useState } from "react";
import Pagination from "./Pagination";
import { FaArrowTrendDown,FaArrowTrendUp } from "react-icons/fa6";

function StockInfo({ stockData, itemsPerPage = 5 }) {
  // Initialize state for the start index of the current page
  const [startIndex, setstartIndex] = useState(0);

  // Calculate the end index for the current page
  const endIndex = startIndex + itemsPerPage;

  // Extract the current items to be displayed on the current page
  const currentItems = stockData.info.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col w-full mb-8 overflow-hidden rounded-b-lg shadow-lg dark:bg-slate-700 ">
      <div className=" overflow-x-auto ">
        <table className="min-w-full">
          <thead className="bg-gray-50 dark:bg-slate-400 text-slate-600  ">
            <tr>
              <th className="px-4 py-2 text-left dark:text-white">Day</th>
              <th className="px-4 py-2 text-left dark:text-white">
                Opening Price
              </th>
              <th className="px-4 py-2 text-left dark:text-white">
                Closing Price
              </th>
              <th className="px-4 py-2 text-left dark:text-white">Markets</th>
            </tr>
          </thead>
          <tbody id="tableBody" className="text-gray-600 dark:bg-slate-700">
            {/* Map through the stock data and create a new row for each day */}
            {currentItems?.map((day, idx, arr) => (
              <tr key={day.date}>
                <td className="px-4 py-2 dark:text-neutral-200 border  border-slate-800">
                  {day.date}
                </td>
                {/* Change the background color of the opening price cell based on the price change(previous day close price) */}
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
                {/* Change the background color of the closing price cell based on the price change */}
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
                <td className="px-4 py-2 dark:text-neutral-200 border border-slate-800">
                  <div className="flex justify-between items-center">
                    {day.close - day.open<0?<FaArrowTrendDown className="text-red-500" size={30} />:<FaArrowTrendUp className="text-green-500" size={30}/>}

                    {/* Display the price change and closing price in a flex container */}
                    <div className="flex flex-col gap-2">
                      <p className={`${day.close - day.open<0?"text-red-500":"text-green-500"} font-semibold`}>{`${(day.close - day.open) / 100}%`}</p>
                      <p className="font-semibold">{day.close}</p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="py-2 px-4">
        {/* component to display pagination buttons */}
        <Pagination
          items={stockData?.info}
          itemsPerPage={itemsPerPage}
          setStartIndex={setstartIndex}
        />
      </div>
    </div>
  );
}

export default StockInfo;