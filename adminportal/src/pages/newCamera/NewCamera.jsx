import "./newCamera.css";

export default function NewCamera() {
  return (
    <div className="newCamera">
      <h1 className="addCameraTitle">New Camera</h1>
      <form className="addCameraForm">
        <div className="addCameraItem">
          <label>Name</label>
          <input type="text" placeholder="Camera x" />
        </div>
        <div className="addCameraItem">
          <label>Deparment</label>
          <input type="text" placeholder="Cs Department" />
        </div>
        <div className="addCameraItem">
          <label>Location</label>
          <input type="text" placeholder="Main Hall" />
        </div>
        <div className="addCameraItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="addCameraItem">
          <label>Camera List</label>
          <select name="avaliable" id="available">
            
          </select>
        </div>
        <button className="addCameraButton">Add Camera</button>
      </form>
    </div>
  );
}
