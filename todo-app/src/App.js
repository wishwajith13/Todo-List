import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete } from "@react-icons/all-files/ai/AiOutlineDelete";
import { BiCheck } from "@react-icons/all-files/bi/BiCheck";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]); //will hold the current state value,will be used to update the state
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    };

    let updatedTodoArr = [...allTodos]; // "..." It takes all the elements of allTodos and spreads them into the new array.
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr)) //for store the local storage 
  };

  const handleDeleteTodo = index => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1); //we can remove from this

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  }

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1); //we can remove from this

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }

  useEffect(() => { //usereffect use in after the refresh the page it will run first
    let savedTodo = JSON.parse(localStorage.getItem('todolist')); //we can convert data string to array
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodo'));
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, [])

  /* JSON.stringify, the array is converted into a string before being stored in localStorage 
  because localStorage can only store strings. 
  Later, when you want to retrieve the data, 
  you would use JSON.parse to convert the JSON string back into an array. */


  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <lable>Title</lable>
            <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What's the task title ?"></input>
          </div>
          <div className='todo-input-item'>
            <lable>Description</lable>
            <input type='text' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="What's the task description ?"></input>
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>

        <div className='btn-area'>
          <button className={`secondaryBtn ${isCompleteScreen === false && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className='todo-list'>

          {isCompleteScreen == false && allTodos.map((item, index) => {
            return (
              <div className='todo-list-item'>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} title='delete?' />
                  <BiCheck className='check-icon' onClick={() => handleComplete(index)} />
                </div>

              </div>
            )
          })}

          {isCompleteScreen == true && completedTodos.map((item, index) => {
            return (
              <div className='todo-list-item'>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>completedOn : {item.completedOn}</small></p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' onClick={() => handleDeleteCompletedTodo(index)} title='delete?' />
                </div>

              </div>
            )
          })}

        </div>

      </div>

    </div>
  );
}

export default App;
