import React, { memo, useEffect, useState } from "react";
import { add, format, differenceInCalendarDays, isFuture } from "date-fns";
import {
  LineChart,
  BarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const dateFormatter = (date) => {
  return format(new Date(date), "dd/MMM");
};

const data = [
  {
    date_time: new Date(2019, 4, 30),
    score: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    date_time: new Date(2019, 5, 1),
    score: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    date_time: new Date(2019, 5, 2),
    score: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    date_time: new Date(2019, 5, 3),
    score: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    date_time: new Date(2019, 5, 4),
    score: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    date_time: new Date(2019, 5, 5),
    score: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    date_time: new Date(2019, 5, 6),
    score: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function GrowthChart({ attemptedQuiz }) {
  const [ndata, setnData] = useState([]);

  useEffect(() => {
    if (attemptedQuiz.length) {
      let temp = attemptedQuiz.map((item) => {
        return { ...item, date_time: new Date(item.date_time) };
      });
      setnData(temp);
    }
  }, [attemptedQuiz]);

  return (
    <>
      {ndata.length > 0 ? (
        <>
          <LineChart width={400} height={300} data={ndata}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date_time" tickFormatter={dateFormatter} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="score" stroke="#82ca9d" />
          </LineChart>
          {/* <BarChart width={400} height={300} data={ndata}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date_time" tickFormatter={dateFormatter} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar type="monotone" dataKey="score" fill="#8884d8" />
          </BarChart> */}
        </>
      ) : null}
    </>
  );
}

export default memo(GrowthChart);
