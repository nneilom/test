import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getApiDataList } from "../../store/reducers/ActionCreators";
import "./Table.css";
import { calculateDaysInWeek, formatDate } from "../../helpers/helpers";
import {
  CONTAINER_CLASS,
  FRAME_CLASS,
  MS_PER_WEEK,
  WEEKS_TO_RENDER,
  monthNames,
} from "../../constants/const";
import ContributionLevel from "../ContributionLevel/ContributionLevel";
import ContributionBox from "../ContributionBox/ContributionBox";

const Table = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.contributionSlice);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getApiDataList());
    };
    fetchData();
  }, [dispatch]);

  const renderMonthHeader = () => {
    return monthNames.map((monthName, index) => (
      <td key={index} colSpan={4}>
        {monthName}
      </td>
    ));
  };

  const [hoveredCellCoords, setHoveredCellCoords] = useState({ x: 0, y: 0 });
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [hoveredContribution, setHoveredContribution] = useState<number | null>(
    null
  );

  const renderTable = useMemo(() => {
    const today = new Date();
    const earliestDate = data ? new Date(Object.keys(data)[0]) : new Date();
    const daysInWeek = calculateDaysInWeek(earliestDate);
    const currentDateStr = today.toISOString().slice(0, 10);

    const tableRows = [];
    const startDate = new Date(today.getTime() - WEEKS_TO_RENDER * MS_PER_WEEK);

    let currentDate = startDate;

    const handleCellMouseEnter = (
      dateString: string,
      contribution: number,
      event: React.MouseEvent
    ) => {
      const formattedDate = formatDate(dateString);
      const weekday =
        formattedDate.slice(0, 1).toUpperCase() + formattedDate.slice(1);
      setHoveredDate(weekday);
      setHoveredContribution(contribution);
      const coordination = event.currentTarget.getBoundingClientRect();
      setHoveredCellCoords({ x: coordination.left, y: coordination.top });
    };

    const handleCellMouseLeave = () => {
      setHoveredDate(null);
      setHoveredContribution(null);
    };

    for (let i = 0; i < 7; i++) {
      const weekData = [];
      const weekStartDate = new Date(
        currentDate.getTime() + i * 24 * 60 * 60 * 1000
      );
      weekData.push(<td key={daysInWeek[i]}>{daysInWeek[i]}</td>);
      for (let j = 0; j < 51; j++) {
        const date = new Date(
          weekStartDate.getTime() + j * 7 * 24 * 60 * 60 * 1000
        );
        const dateString = date.toISOString().slice(0, 10);
        const contribution = data[dateString] || 0;

        let contributionLevel = <ContributionLevel level={0} />;

        if (dateString <= currentDateStr) {
          if (contribution >= 1 && contribution <= 9) {
            contributionLevel = <ContributionLevel level={1} />;
          } else if (contribution >= 10 && contribution <= 19) {
            contributionLevel = <ContributionLevel level={2} />;
          } else if (contribution >= 20 && contribution <= 29) {
            contributionLevel = <ContributionLevel level={3} />;
          } else if (contribution >= 30) {
            contributionLevel = <ContributionLevel level={4} />;
          }

          weekData.push(
            <td
              key={`${dateString}-${j}`}
              onMouseEnter={(event) =>
                handleCellMouseEnter(dateString, contribution, event)
              }
              onMouseLeave={handleCellMouseLeave}
              className="table-cell"
            >
              {contributionLevel}
            </td>
          );
        }

        if (currentDateStr === dateString) {
          break;
        }
      }
      tableRows.push(<tr key={i}>{weekData}</tr>);
      if (currentDateStr === weekStartDate.toISOString().slice(0, 10)) {
        break;
      }
    }

    return tableRows;
  }, [data]);

  return (
    <div className={CONTAINER_CLASS}>
      <div className={FRAME_CLASS}>
        <table>
          <thead>
            <tr>
              <th colSpan={4}></th>
              {renderMonthHeader()}
            </tr>
          </thead>
          <tbody>{renderTable}</tbody>
        </table>
        <ContributionBox />
      </div>
      {hoveredContribution !== null && (
        <div
          className="DateContibution"
          style={{
            top: hoveredCellCoords.y - 60,
            left: hoveredCellCoords.x - 90,
          }}
        >
          <div className="TextContibution">
            {hoveredContribution} contributions
          </div>
          <div className="TextContibution light">{hoveredDate}</div>
          <div className="Pointer"></div>
        </div>
      )}
    </div>
  );
};

export default Table;
