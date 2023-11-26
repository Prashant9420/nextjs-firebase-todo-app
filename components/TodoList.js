import { db } from "@/firebase";
import {
  onSnapshot,
  orderBy,
  query,
  collection,
  where,
} from "@firebase/firestore";
import { useState, useEffect } from "react";
import Todo from "./Todo";
import { useAuth } from "@/Auth";

const TodoList = ({ todosProps }) => {
  const [todos, setTodos] = useState([]);
  //get current user info
  const { currentUser } = useAuth();
  useEffect(() => {
    const collectionRef = collection(db, "todos");
    const q = query(
      collectionRef,
      where("email", "==", currentUser?.email),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
    });
    return unsubscribe;
  }, []);
  return (
    <div>
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          title={todo.title}
          detail={todo.detail}
          timestamp={todo.timestamp}
        />
      ))}
    </div>
  );
};

export default TodoList;
