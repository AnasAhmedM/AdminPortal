import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { NumberOfPeople, PeopleWithoutMask, PeopleNoSocialDistance } from "../../dummyData";

export default function Home() {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={NumberOfPeople} title="Number Of People" grid dataKey="Total"/>
      <Chart data={PeopleWithoutMask} title="People Without Mask" grid dataKey="Total"/>
      <Chart data={PeopleNoSocialDistance} title="People Not Social Distancing" grid dataKey="Total"/>
    </div>
  );
}
