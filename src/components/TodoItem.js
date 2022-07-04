/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  AiFillDownCircle as ArrowDropdown,
  AiFillUpCircle as ArrowMoveup,
  AiFillEdit as EditIcon,
  AiFillDelete as DeleteIcon,
  AiOutlineCheck as CheckIcon,
} from "react-icons/ai";
import { motion } from "framer-motion";

const TodoItem = (props) => {
  const { item } = props;
  const [showContent, setShowContent] = useState(false);
  const [isForward, setIsForward] = useState(null);
  const [isInPast, setIsInPast] = useState(false);
  let newDate = new Date(item.date);
  newDate.setDate(newDate.getDate() + 1);
  newDate = newDate.toISOString();
  newDate = newDate.split("");
  newDate = newDate.slice(0, 10);
  newDate = newDate.join("");

  useEffect(() => {
    let today = new Date();
    today = today.toISOString();
    today = today.split("");
    today = today.slice(0, 10);
    today = today.join("");
    today = new Date(today);
    const itemDate = new Date(newDate);
    if (itemDate < today) {
      setIsInPast(true);
    }
  }, []);

  const dropdownHandler = () => {
    if (!showContent) {
      setShowContent(true);
    } else {
      setTimeout(() => {
        setShowContent(false);
      }, 1000);
    }
    setIsForward(!isForward);
  };
  const editClickHandler = () => {
    props.onEdit(item);
  };
  const deleteClickHandler = () => {
    props.onDelete(item);
  };
  const checkClickHandler = () => {
    props.onCheck(item);
  };

  let animatedContent = <></>;
  if (showContent) {
    animatedContent = (
      <motion.div
        className="mx-2 mb-2 flex flex-wrap w-full"
        initial={{ height: 0 }}
        animate={isForward ? { height: "auto" } : { height: 0 }}
        transition={{
          type: "tween",
          duration: 0.5,
          delay: isForward ? 0 : 0.5,
        }}
      >
        <motion.p
          className={
            isInPast
              ? "text-slate-700 w-full line-through"
              : "text-slate-700 w-full"
          }
          initial={{ opacity: 0 }}
          animate={isForward ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            type: "tween",
            duration: 0.5,
            delay: isForward ? 0.5 : 0,
          }}
        >
          {item.content}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isForward ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            type: "tween",
            duration: 0.5,
            delay: isForward ? 0.5 : 0,
          }}
          className="flex flex-row w-full justify-end my-2 items-center"
        >
          <button
            disabled={isInPast}
            onClick={checkClickHandler}
            className="py-1 px-4 border-2 border-slate-700 rounded-md mr-1 disabled:opacity-0"
          >
            <CheckIcon className="fill-slate-700 text-2xl" />
          </button>
          <button
            disabled={isInPast}
            onClick={editClickHandler}
            className="py-1 px-4 border-2 border-slate-700 rounded-md mr-1 disabled:opacity-0"
          >
            <EditIcon className="fill-slate-700 text-2xl" />
          </button>
          <button
            disabled={isInPast}
            onClick={deleteClickHandler}
            className="py-1 px-4 border-2 border-slate-700 rounded-md disabled:opacity-0"
          >
            <DeleteIcon className="fill-slate-700 text-2xl" />
          </button>
        </motion.div>
      </motion.div>
    );
  } else {
    animatedContent = <></>;
  }

  return (
    <motion.div
      initial={{ y: "100vh" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className=" w-2/5 inline-block mx-8 mb-8 mt-2"
    >
      <div className="flex flex-wrap rounded-md shadow-md shadow-slate-900 justify-between items-center">
        <h1
          className={
            isInPast
              ? "font-bold text-slate-700 mx-2 my-2 w-3/5 line-through"
              : "font-bold text-slate-700 mx-2 my-2 w-3/5"
          }
        >
          {item.title}
        </h1>
        <h1
          className={
            isInPast
              ? "font-bold text-slate-700 line-through"
              : "font-bold text-slate-700"
          }
        >
          {newDate}
        </h1>
        {showContent && (
          <ArrowMoveup
            onClick={dropdownHandler}
            className="mx-2 fill-slate-700"
          />
        )}
        {!showContent && (
          <ArrowDropdown
            onClick={dropdownHandler}
            className="mx-2 fill-slate-700"
          />
        )}
        {animatedContent}
      </div>
    </motion.div>
  );
};

export default TodoItem;
