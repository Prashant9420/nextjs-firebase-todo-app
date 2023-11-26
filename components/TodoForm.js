import { Button, TextField } from "@mui/material";
import {
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "@/firebase";
import { addDoc } from "firebase/firestore";
import { TodoContext } from "@/pages/TodoContext";
import { useAuth } from "@/Auth";

const TodoForm = () => {
  const inputAreaRef = useRef();
  const { currentUser } = useAuth();
  const { showAlert, todo, setTodo } = useContext(TodoContext);
  const onSubmit = async () => {
    if (todo?.hasOwnProperty("timestamp")) {
      //update the todo
      const docRef = doc(db, "todos", todo.id);
      const todoUpdated = {
        ...todo,
        timestamp: serverTimestamp(),
      };
      updateDoc(docRef, todoUpdated);
      setTodo({ title: "", detail: "" });
      showAlert("info", `Todo with id ${todo.id} is updated succesfully`);
    } else {
      const collectionRef = collection(db, "todos");
      const docRef = await addDoc(collectionRef, {
        ...todo,
        email: currentUser.email,
        timestamp: serverTimestamp(),
      });
      setTodo({ title: "", detail: "" });
      showAlert("success", `Todo with id ${docRef.id} is added succesfully`);
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        console.log("Outside input area");
        setTodo({ title: "", detail: "" });
      } else {
        console.log("Inside input area");
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        console.log("Outside input area");
        setTodo({ title: "", detail: "" });
      } else {
        console.log("Inside input area");
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  return (
    <div ref={inputAreaRef}>
      <TextField
        fullWidth
        label="title"
        margin="normal"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <TextField
        fullWidth
        label="detail"
        multiline
        maxRows={4}
        value={todo.detail}
        onChange={(e) => setTodo({ ...todo, detail: e.target.value })}
      />
      <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>
        {todo.hasOwnProperty("timestamp") ? "Update todo" : "Add a new Todo"}
      </Button>
    </div>
  );
};

export default TodoForm;
