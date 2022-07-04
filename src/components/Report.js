/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BarChart from "./charts/BarChart";
import PieChart from "./charts/PieChart";
import FilterModal from "./FilterModal";

const Report = () => {
  let date = new Date();
  date = date.toISOString();
  date = date.split("");
  date = date.slice(0, 10);
  date = date.join("");
  const [dateData, setDateData] = useState({
    startDate: date,
    endDate: date,
  });
  const [reportData, setReportData] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const { user_id } = useParams();
  const getReportData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/todo/count/${user_id}/${dateData.startDate}/${dateData.endDate}`
      );
      const data = await response.json();
      const filteredData = data.filter(
        (dataItem) =>
          dataItem.completed === true || dataItem.completed === false
      );
      setReportData(filteredData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getReportData();
  }, [dateData]);

  const filterReturnHandler = (dates) => {
    setDateData(dates);
    setShowFilterModal(false);
  };

  const cancelHandler = () => {
    getReportData();
    setShowFilterModal(false);
  };

  let content = <></>;
  if (dateData.startDate === dateData.endDate) {
    content = (
      <h1 className="text-center text-slate-700 text-2xl my-4">
        Report: {dateData.startDate}
      </h1>
    );
  } else {
    content = (
      <h1 className="text-center text-slate-700 text-2xl my-4">
        Report: {dateData.startDate} to {dateData.endDate}
      </h1>
    );
  }

  return (
    <>
      {showFilterModal ? (
        <FilterModal
          user_id={user_id}
          onFilter={filterReturnHandler}
          onCancel={cancelHandler}
        />
      ) : null}
      <div className="flex justify-center items-center mb-6 mt-10 relative">
        <div className="w-2/3 bg-gray-100 rounded-md shadow-md shadow-slate-900">
          {content}
          {reportData.length === 0 && (
            <p className="text-center text-slate-700 text-xl my-2">
              No todos found for this date filter
            </p>
          )}
          {reportData.length !== 0 && (
            <div className="w-full flex justify-center mx-6 items-center">
              <div className="w-1/3">
                <PieChart reportData={reportData} />
              </div>
              <div className="w-1/2 ml-6">
                <BarChart reportData={reportData} />
              </div>
            </div>
          )}
          <div className="w-full flex justify-center items-center my-8">
            <button
              onClick={() => {
                setShowFilterModal(true);
              }}
              className="bg-slate-700 hover:bg-slate-900 shadow-md shadow-slate-900 text-white text-lg py-2 px-4 rounded-md "
            >
              Filter by Dates
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;
