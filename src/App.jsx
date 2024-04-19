import { useState } from "react";
import Container from "./components/container/container";
import StockInfo from "./components/container/stockInfo";
import stock_data from "./data/stock_data.json";
function App() {
  const [stockInfo, setStockInfo] = useState(stock_data.data[0]); // default to show the first stock in th stock data
  const [numberOfDays, setNumberOfDays] = useState(3);

  return (
    <div className="min-h-screen flex justify-center items-center flex-wrap content-center dark:bg-slate-800">
      <Container>
        <div className="flex p-4 h-auto rounded-t-lg shadow-lg dark:bg-slate-700 justify-between">
          <div className=" text-xl font-semibold text-slate-800 dark:text-white">
            {stockInfo.stockName}
          </div>
          <div className="flex ">
            <label htmlFor="stock" className="mr-2">
              <select
                id="stock"
                className="border border-gray-300 rounded px-3 py-1"
                onChange={(e) => {
                  const filterData = stock_data?.data?.filter(
                    (stock) => stock.stockName === e.target.value
                  )[0];
                  console.log(filterData);
                  setStockInfo(filterData);
                }}
              >
                {/*map through the stock data and create options for each item in the array*/}
                {stock_data?.data?.map((stock) => (
                  <option key={stock.stockName} value={stock.stockName}>
                    {stock.stockName}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="days" className="mr-2">
              <select
                id="days"
                className="border border-gray-300 rounded px-3 py-1"
                onChange={(e) => setNumberOfDays(parseInt(e.target.value))}
              >
                <option value="3">3 days</option>
                <option value="5">5 days</option>
                <option value="10">10 days</option>
              </select>
            </label>
          </div>
        </div>
        <StockInfo stockData={stockInfo} itemsPerPage={numberOfDays} />
      </Container>
    </div>
  );
}

export default App;
