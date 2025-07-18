/* eslint-disable react/prop-types */
import styled from "styled-components";
import Heading from "../../ui/Heading";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useDarkMode } from "../../context/DarkModeContextProvider";
import EmptyChartData from "../../ui/EmptyChartData";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;
  height: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  
  & > *:first-child {
    margin-bottom: 1.6rem;
  }
  
  & .recharts-pie-label-text {
    font-weight: 600;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    padding: 1.6rem;
    min-height: 350px;
  }
`;

const ChartContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.isEmpty ? 'center' : 'flex-start'};
  align-items: center;
  position: relative;
`;

const startDataLight = [
  { duration: "1 night", value: 0, color: "#ef4444" },
  { duration: "2 nights", value: 0, color: "#f97316" },
  { duration: "3 nights", value: 0, color: "#eab308" },
  { duration: "4-5 nights", value: 0, color: "#84cc16" },
  { duration: "6-7 nights", value: 0, color: "#22c55e" },
  { duration: "8-14 nights", value: 0, color: "#14b8a6" },
  { duration: "15-21 nights", value: 0, color: "#3b82f6" },
  { duration: "21+ nights", value: 0, color: "#a855f7" },
];

const startDataDark = [
  { duration: "1 night", value: 0, color: "#b91c1c" },
  { duration: "2 nights", value: 0, color: "#c2410c" },
  { duration: "3 nights", value: 0, color: "#a16207" },
  { duration: "4-5 nights", value: 0, color: "#4d7c0f" },
  { duration: "6-7 nights", value: 0, color: "#15803d" },
  { duration: "8-14 nights", value: 0, color: "#0f766e" },
  { duration: "15-21 nights", value: 0, color: "#1d4ed8" },
  { duration: "21+ nights", value: 0, color: "#7e22ce" },
];

function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

export default function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);
  const isEmpty = !confirmedStays.length;

  return (
    <ChartBox>
      <Heading as='h2'>Stay Duration Summary</Heading>
      <ChartContainer isEmpty={isEmpty}>
        {confirmedStays.length ? (
          <ResponsiveContainer width={'100%'} height={300}>
            <PieChart>
              <Pie
                data={data}
                nameKey={'duration'}
                dataKey={'value'}
                innerRadius={50}
                outerRadius={80}
                cx={'50%'}
                cy={'50%'}
                paddingAngle={3}
              >
                {data.map(entry => (
                  <Cell key={entry.duration} fill={entry.color} stroke={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <EmptyChartData label={"No stays yet."} />
        )}

        {confirmedStays.length > 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '20px',
            fontSize: '16px'
          }}>
            {data.map((entry) => (
              <div key={entry.duration} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: entry.color,
                  borderRadius: '50%'
                }}></div>
                <span>{entry.duration}: {entry.value}</span>
              </div>
            ))}
          </div>
        )}
      </ChartContainer>
    </ChartBox>
  );
}