import "./featuredInfo.css";
import {useEffect, useState} from "react";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { Weights } from "../../pages/trends/trendsW";

export default function FeaturedInfo({titles, values, oldValues, clause}) {
  const [featureOne, setFeatureOne] = useState(0)
  const [featureTwo, setFeatureTwo] = useState(0)
  const [featureThree, setFeatureThree] = useState(0)
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
  const interval = setInterval(() => setTime(Date.now()), 10000);
  return () => {
    clearInterval(interval);
  };
  }, []);

  const percIncrease = (a, b) =>{
    let percent = 0.0;
    if(b !== 0) 
        if(a !== 0)
            percent = (b - a) / a * 100;
        else 
            percent = b * 100;
    else
        percent = - a * 100;           
    return percent.toFixed(2);
  }

  useEffect(()=>{
      setFeatureOne(percIncrease(oldValues[0],values[0]))
      setFeatureTwo(percIncrease(oldValues[1],values[1]))
      setFeatureThree(percIncrease(oldValues[2],values[2]))
      Weights['crowd'] = featureOne
      Weights['unmasked'] = featureTwo
      Weights['violation'] = featureThree
  })
  
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
