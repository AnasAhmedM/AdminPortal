import "./featuredInfo.css";
import {useState} from "react";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfoTrends({titles, values, weights, clause}) {
  const [featureOne] = useState(weights[0])
  const [featureTwo] = useState(weights[1])
  const [featureThree] = useState(weights[2])
  
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">{titles[0]}</span>
        <div className="featuredContainer">
          <span className="featuredNumber">{values[0]}</span>
          {featureOne <=0?
            <span className="featuredRate">
            {featureOne}% <ArrowDownward  className="featuredIcon negative"/>
            </span>:
             <span className="featuredRate">
             {featureOne}% <ArrowUpward  className="featuredIcon positive"/>
            </span>
          }
          
        </div>
        <span className="featuredSub">{clause}</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">{titles[1]}</span>
        <div className="featuredContainer">
          <span className="featuredNumber">{values[1]}</span>
          {featureTwo <=0?
            <span className="featuredRate">
            {featureTwo}% <ArrowDownward  className="featuredIcon negative"/>
            </span>:
             <span className="featuredRate">
             {featureTwo}% <ArrowUpward  className="featuredIcon positive"/>
            </span>
          }
          
        </div>
        <span className="featuredSub">{clause}</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">{titles[2]}</span>
        <div className="featuredContainer">
        <span className="featuredNumber">{values[2]}</span>
          {featureThree <=0?
              <span className="featuredRate">
              {featureThree}% <ArrowDownward  className="featuredIcon negative"/>
              </span>:
              <span className="featuredRate">
              {featureThree}% <ArrowUpward  className="featuredIcon positive"/>
              </span>
            }
        
        </div>
        <span className="featuredSub">{clause}</span>
      </div>
    </div>
  );
}
