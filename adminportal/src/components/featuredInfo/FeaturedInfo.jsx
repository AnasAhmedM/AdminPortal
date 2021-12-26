import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Crowd Density</span>
        <div className="featuredContainer">
          <span className="featuredNumber">2000</span>
          <span className="featuredRate">
           -30% <ArrowDownward  className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">No Mask</span>
        <div className="featuredContainer">
          <span className="featuredNumber">300</span>
          <span className="featuredRate">
            -20% <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">No Social Distance</span>
        <div className="featuredContainer">
        <span className="featuredNumber">400</span>
          <span className="featuredRate">
            -20% <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
