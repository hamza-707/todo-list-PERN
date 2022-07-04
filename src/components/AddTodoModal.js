import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const AddTodoModal = (props) => {
  const { user_id, onCancel } = props;
  const Backdrop = () => {
    return (
      <div className="z-10 top-0 left-0 h-screen w-full fixed bg-opacity-50 bg-black"></div>
    );
  };
  const Modal = (props) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const { user_id, onCancel } = props;
    const contentChangeHandler = (event) => {
      setContent(event.target.value);
    };

    const titleChangeHandler = (event) => {
      setTitle(event.target.value);
    };

    const dateChangeHandler = (event) => {
      setDate(event.target.value);
    };

    const addTodoHandler = async (event) => {
      try {
        event.preventDefault();
        await fetch(`http://localhost:8000/todo/${user_id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: content,
            title: title,
            date: date,
          }),
        });
        onCancel();
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
            <p className="text-xl text-white">Add New Todo</p>
          </div>
          <div className="py-2 px-4">
            <form>
              <label htmlFor="title" className="block text-lg fill-slate-700">
                Title:
              </label>
              <input
                id="title"
                type="text"
                className="w-full block bg-slate-300 rounded text-base py-2 px-2"
                value={title}
                onChange={titleChangeHandler}
              />
              <label htmlFor="content" className="block text-lg fill-slate-700">
                Content:
              </label>
              <textarea
                rows={3}
                id="content"
                type="text"
                value={content}
                onChange={contentChangeHandler}
                className=" resize-none w-full block bg-slate-300 rounded text-base py-2 px-2"
              />
              <label htmlFor="date" className="block text-lg fill-slate-700">
                Date:
              </label>
              <input
                id="date"
                type="date"
                className="w-full block bg-slate-300 rounded text-base py-2 px-2"
                value={date}
                onChange={dateChangeHandler}
              />
              <div className="flex justify-end items-center my-4">
                <button
                  onClick={addTodoHandler}
                  className="py-2 px-4 rounded-md bg-slate-700 shadow-md shadow-slate-900 mr-4 hover:bg-slate-900"
                >
                  <p className="text-lg text-white">Add Todo</p>
                </button>
                <button
                  onClick={() => {
                    props.onCancel();
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
        <Modal user_id={user_id} onCancel={onCancel} />,
        document.getElementById("modal-root")
      )}
      {createPortal(<Backdrop />, document.getElementById("overlay-root"))}
    </>
  );
};

export default AddTodoModal;
