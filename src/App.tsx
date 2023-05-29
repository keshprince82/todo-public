import Login from "./Login";
import {
  Route,
  BrowserRouter as Router,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import List from "./components/List";
import './App.css'
import { MyContext } from "./Context"; 
import { useState } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { todoObject } from "./interface";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute check={true} > <Login/> </ProtectedRoute> 
    },
    {
      path: "/List",
      element:<ProtectedRoute ><List /></ProtectedRoute> ,
    },
  ]);
  const [UserName, setUserName] = useState<string>();
  const [todos, setTodos]  = useState<todoObject[]>([
    {
      name: "buy milk",
      isNested: true,
      description: "Buy milk and come home and make tea",
      completed: true,
    },
    { name: "buy tea", isNested: false, description: "", completed: false },
    {
      name: "buy coffee",
      isNested: true,
      description: "Buy milk and come home and make tea",
      completed: false,
    },
    {
      name: "buy eggs",
      isNested: true,
      description: "Buy milk and come home and make tea", 
      completed: true,
    },
  ]);
  return (
    <div>
       <MyContext.Provider value={{ UserName, setUserName,todos,setTodos }}>
      {/* <Login /> */}

      <RouterProvider router={router} />
      </MyContext.Provider>
      {/* <List /> */}
    </div>
  );
}

export default App;
