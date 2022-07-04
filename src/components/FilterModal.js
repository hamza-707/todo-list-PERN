import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const FilterModal = (props) => {
  const { user_id, onCancel, onFilter } = props;
  const Backdrop = () => {
    return (
      <div className="z-10 top-0 left-0 h-screen w-full fixed bg-opacity-50 bg-black"></div>
    );
  };
  const Modal = (props) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const { user_id, onCancel, onFilter } = props;
    const startDateChangeHandler = (event) => {
      setStartDate(event.target.value);
    };

    const endDateChangeHandler = (event) => {
      setEndDate(event.target.value);
    };

    const filterTodoHandler = (event) => {
      try {
        event.preventDefault();
        onFilter({
          startDate: startDate,
          endDate: endDate,
        });
      } catch (err) {
        console.log(err);
      }
    };
    return (
      <div className="flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "tween", duration: 0.5 }}
          className="fixed top-32 w-3/5 z-20 overflow-hidden rounded-md bg-gray-100 mx-auto mt-0"
        >
          <div className="bg-slate-700 p-4">
            <p className="text-xl text-white">Filter by Dates</p>
          </div>
          <div className="py-2 px-4">
            <form>
              <label
                htmlFor="startDate"
                className="block text-lg fill-slate-700"
              >
                Start Date:
              </label>
              <input
                id="date"
                type="date"
                className="w-full block bg-slate-300 rounded text-base py-2 px-2"
                value={startDate}
                onChange={startDateChangeHandler}
              />
              <label htmlFor="endDate" className="block text-lg fill-slate-700">
                End Date:
              </label>
              <input
                id="date"
                type="date"
                className="w-full block bg-slate-300 rounded text-base py-2 px-2"
                value={endDate}
                onChange={endDateChangeHandler}
              />
              <div className="flex justify-end items-center my-4">
                <button
                  onClick={filterTodoHandler}
                  className="py-2 px-4 rounded-md bg-slate-700 shadow-md shadow-slate-900 mr-4 hover:bg-slate-900"
                >
                  <p className="text-lg text-white">Filter</p>
                </button>
                <button
                  onClick={() => {
                    onCancel();
                  }}
                  className="py-2 px-4 rounded-md bg-slate-700 shadow-md shadow-slate-900 hover:bg-slate-900"
                >
                  <p className="text-lg text-white">Cancel</p>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    );
  };
  return (
    <>
      {createPortal(
        <Modal user_id={user_id} onCancel={onCancel} onFilter={onFilter} />,
        document.getElementById("modal-root")
      )}
      {createPortal(<Backdrop />, document.getElementById("overlay-root"))}
    </>
  );
};

export default FilterModal;
