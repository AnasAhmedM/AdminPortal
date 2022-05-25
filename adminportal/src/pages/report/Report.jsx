import "./report.css"
import {useLocation} from "react-router-dom";

export default function Report(){
    const location = useLocation()
    const {title, description, reporter} = location.state
    return(
        <div className="report">
            <div className="reportTitleContainer">
                <h1 className="reportTitle">Report</h1>
            </div>
            <div className="reportContainer">
                <div className="reportShow">
                    <div className="reportShowBlock">
                        <div className="reportShowTopTitle">
                            <h2 className="reportFieldShowTitle">Title</h2>
                            <span className="reportShowTitle">{title}</span>
                        </div>
                    </div>
                    <div className="reportShowBlock">
                        <div className="reportShowTopTitle">
                            <h2 className="reportFieldShowTitle">Description</h2>
                            <span className="reportShowDesc">{description}</span>
                        </div>
                    </div>
                    <div className="reportShowBlock">
                        <div className="reportShowTopTitle">
                            <h3 className="reportFieldShowTitle">Reporter</h3>
                            <span className="reportShowDesc">{reporter}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}