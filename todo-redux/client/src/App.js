import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from "./components/Test";
import Main from "./components/Main";

const router = createBrowserRouter([
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/",
    element: <Main />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
