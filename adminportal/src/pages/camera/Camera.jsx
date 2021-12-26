import { Link } from "react-router-dom";
import "./camera.css";
import Chart from "../../components/chart/Chart"
import {cameraData} from "../../dummyData"
import { Publish } from "@material-ui/icons";

export default function Camera() {
  return (
    <div className="camera">
      <div className="cameraTitleContainer">
        <h1 className="cameraTitle">Camera</h1>
        <Link to="/newcamera">
          <button className="cameraAddButton">Create</button>
        </Link>
      </div>
      <div className="cameraTop">
          <div className="cameraTopLeft">
              <Chart data={cameraData} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="cameraTopRight">
              <div className="cameraInfoTop">
                  <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="cameraInfoImg" />
                  <span className="cameraName">Apple Airpods</span>
              </div>
              <div className="cameraInfoBottom">
                  <div className="cameraInfoItem">
                      <span className="cameraInfoKey">id:</span>
                      <span className="cameraInfoValue">123</span>
                  </div>
                  <div className="cameraInfoItem">
                      <span className="cameraInfoKey">sales:</span>
                      <span className="cameraInfoValue">5123</span>
                  </div>
                  <div className="cameraInfoItem">
                      <span className="cameraInfoKey">active:</span>
                      <span className="cameraInfoValue">yes</span>
                  </div>
                  <div className="cameraInfoItem">
                      <span className="cameraInfoKey">in stock:</span>
                      <span className="cameraInfoValue">no</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="cameraBottom">
          <form className="cameraForm">
              <div className="cameraFormLeft">
                  <label>Camera Name</label>
                  <input type="text" placeholder="Apple AirPod" />
                  <label>In Stock</label>
                  <select name="inStock" id="idStock">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select>
                  <label>Active</label>
                  <select name="active" id="active">
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                  </select>
              </div>
              <div className="cameraFormRight">
                  <div className="cameraUpload">
                      <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="cameraUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="cameraButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
