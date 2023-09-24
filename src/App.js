import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import HomeLayout from "./Layout/HomeLayout";
import Home from "./Home";
import About from "./About";
import Apid, { loader as ApidLoader } from "./Apid";
import Api from "./Api";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="api" element={<Api />} />
      <Route path="api/:id" element={<Apid />} loader={ApidLoader} />
      <Route path="*" element={null} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
