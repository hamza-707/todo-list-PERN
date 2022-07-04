import { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const EditTodoModal = (props) => {
  const { item, onCancel } = props;
  const Backdrop = () => {
    return (
      <div className="z-10 top-0 left-0 h-screen w-full fixed bg-opacity-50 bg-black"></div>
    );
  };
  const Modal = (props) => {
    const [title, setTitle] = useState(props.item.title);
    const [content, setContent] = useState(props.item.content);
    const [date, setDate] = useState(props.item.date);
    const titleChangeHandler = (event) => {
      setTitle(event.target.value);
    };

    const contentChangeHandler = (event) => {
      setContent(event.target.value);
    };

    const dateChangeHandler = (event) => {
      setDate(event.target.value);
    };

    const editClickHandler = async (event) => {
      event.preventDefault();
      try {
        await fetch(`http://localhost:8000/todo/${props.item.todo_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: content,
            title: title,
            completed: props.item.completed,
            date: date,
          }),
        });
        props.onCancel();
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
            <p className="text-xl text-white">Edit Todo</p>
          </div>
          <div className="py-2 px-4">
            <form>
              <label htmlFor="title" className="block text-lg fill-slate-700">
                Title:
              </label>
              <input
                onChange={titleChangeHandler}
                required="true"
                value={title}
                id="title"
                type="text"
                className="w-full block bg-slate-300 rounded text-base py-2 px-2"
              />
              <label htmlFor="content" className="block text-lg fill-slate-700">
                Content:
              </label>
              <textarea
                onChange={contentChangeHandler}
                required="true"
                value={content}
                rows={3}
                id="content"
                type="text"
                className=" resize-none w-full block bg-slate-300 rounded text-base py-2 px-2"
              />
              <label htmlFor="date" className="block text-lg fill-slate-700">
                Date:
              </label>
              <input
                onChange={dateChangeHandler}
                required="true"
                value={date}
                id="date"
                type="date"
                className="w-full block bg-slate-300 rounded text-base py-2 px-2"
              />
              <div className="flex justify-end items-center my-4">
                <button
                  onClick={editClickHandler}
                  type="submit"
                  className="py-2 px-4 rounded-md bg-slate-700 shadow-md shadow-slate-900 mr-4 hover:bg-slate-900"
                >
                  <p className="text-lg text-white">Edit</p>
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
        <Modal item={item} onCancel={onCancel} />,
        document.getElementById("modal-root")
      )}
      {createPortal(<Backdrop />, document.getElementById("overlay-root"))}
    </>
  );
};

export default EditTodoModal;
