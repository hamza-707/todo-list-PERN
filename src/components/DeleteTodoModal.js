import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const DeleteTodoModal = (props) => {
  const { item, onCancel } = props;
  const Backdrop = () => {
    return (
      <div className="z-10 top-0 left-0 h-screen w-full fixed bg-opacity-50 bg-black"></div>
    );
  };
  const Modal = (props) => {
    const { item, onCancel } = props;
    const deleteClickHandler = async (event) => {
      try {
        await fetch(`http://localhost:8000/todo/${item.todo_id}`, {
          method: "DELETE",
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
          className="fixed top-32 w-2/5 z-20 overflow-hidden rounded-md bg-gray-100 mx-auto mt-0"
        >
          <div className="bg-slate-700 p-4">
            <p className="text-xl text-white">Delete Todo</p>
          </div>
          <div className="py-2 px-4">
            <div className="flex justify-center">
              <p className="text-lg fill-slate-700">
                Do you want to delete this Todo?
              </p>
            </div>
            <div className="flex justify-center items-center my-4">
              <button
                onClick={deleteClickHandler}
                className="py-2 px-4 rounded-md bg-slate-700 shadow-md shadow-slate-900 mr-4 hover:bg-slate-900"
              >
                <p className="text-lg text-white">Delete</p>
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

export default DeleteTodoModal;
