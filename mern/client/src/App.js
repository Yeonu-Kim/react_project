import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />
  },
  {
    path: "/hotels",
    element: <List />
  },
  {
    path: "/hotels/:id",
    element: <Hotel />
  },
])
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
