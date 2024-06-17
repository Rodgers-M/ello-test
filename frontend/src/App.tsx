import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { BookList } from "./components/books/BookList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BookList />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
