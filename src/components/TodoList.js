/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import AddTodoModal from "./AddTodoModal";
import EditTodoModal from "./EditTodoModal";
import DeleteTodoModal from "./DeleteTodoModal";
import CompleteTodoModal from "./CompleteTodoModal";
import FilterModal from "./FilterModal";
import TodoItem from "./TodoItem";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const TodoList = () => {
  let date = new Date();
  date = date.toISOString();
  date = date.split("");
  date = date.slice(0, 10);
  date = date.join("");
  const [reanimate, setReanimate] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [dateData, setDateData] = useState({
    startDate: date,
    endDate: date,
  });
  const [itemToEdit, setItemToEdit] = useState({});
  const [itemToDelete, setItemToDelete] = useState({});
  const [itemToConfirm, setItemToConfirm] = useState({});
  const [items, setItems] = useState([]);
  const { user_id } = useParams();

  const getTodoItems = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/todo/${user_id}/${dateData.startDate}/${dateData.endDate}`
      );
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodoItems();
  }, [dateData]);

  const addTodoHandler = () => {
    setShowAddModal(true);
  };
  const filterHandler = () => {
    setShowFilterModal(true);
  };
  const editHandler = (item) => {
    setItemToEdit(item);
    setShowEditModal(true);
  };
  const deleteHandler = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };
  const checkHandler = (item) => {
    setItemToConfirm(item);
    setShowConfirmModal(true);
  };
  const cancelHandler = () => {
    getTodoItems();
    setShowAddModal(false);
    setShowConfirmModal(false);
    setShowDeleteModal(false);
    setShowEditModal(false);
    setShowFilterModal(false);
  };

  const filterReturnHandler = (dates) => {
    setDateData(dates);
    setReanimate(true);
    setShowFilterModal(false);
  };

  let content = <></>;
  if (dateData.startDate === dateData.endDate) {
    content = (
      <h1 className="text-center text-slate-700 text-2xl my-4">
        Todos: {dateData.startDate}:
      </h1>
    );
  } else {
    content = (
      <h1 className="text-center text-slate-700 text-2xl my-4">
        Todos: {dateData.startDate} to {dateData.endDate}:
      </h1>
    );
  }
  return (
    <motion.div
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {showAddModal ? (
        <AddTodoModal user_id={user_id} onCancel={cancelHandler} />
      ) : null}
      {showEditModal ? (
        <EditTodoModal item={itemToEdit} onCancel={cancelHandler} />
      ) : null}
      {showDeleteModal ? (
        <DeleteTodoModal item={itemToDelete} onCancel={cancelHandler} />
      ) : null}
      {showConfirmModal ? (
        <CompleteTodoModal item={itemToConfirm} onCancel={cancelHandler} />
      ) : null}
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
          {items.length === 0 && (
            <p className="text-center text-slate-700 text-xl my-2">
              No todos found for this date filter
            </p>
          )}
          <div className="flex flex-wrap justify-between">
            {items.map((item) => (
              <TodoItem
                item={item}
                key={item.todo_id}
                onEdit={editHandler}
                onDelete={deleteHandler}
                onCheck={checkHandler}
                reanimate={reanimate}
              />
            ))}
          </div>
          <div className="w-full flex justify-center items-center my-8">
            <button
              onClick={addTodoHandler}
              className="bg-slate-700 hover:bg-slate-900 shadow-md shadow-slate-900 text-white text-lg py-2 px-4 rounded-md mr-4"
            >
              Add New Todo
            </button>
            <button
              onClick={filterHandler}
              className="bg-slate-700 hover:bg-slate-900 shadow-md shadow-slate-900 text-white text-lg py-2 px-4 rounded-md "
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoList;
