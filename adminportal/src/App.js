import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CoordinatorList from "./pages/coordinatorList/CoordinatorList";
import Coordinator from "./pages/coordinator/Coordinator";
import NewCoordinator from "./pages/newCoordinator/NewCoordinator";
import CameraList from "./pages/cameraList/CameraList";
import Camera from "./pages/camera/Camera";
import NewCamera from "./pages/newCamera/NewCamera";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/coordinators">
            <CoordinatorList />
          </Route>
          <Route path="/coordinator/:id">
            <Coordinator />
          </Route>
          <Route path="/newCoordinator">
            <NewCoordinator />
          </Route>
          <Route path="/cameras">
            <CameraList />
          </Route>
          <Route path="/camera/:id">
            <Camera />
          </Route>
          <Route path="/newcamera">
            <NewCamera />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
