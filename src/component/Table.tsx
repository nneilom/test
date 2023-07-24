import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getApiDataList } from "../store/reducers/ActionCreators";
import "./Table.css";

const Table = () => {
  //! получение данных с api
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.contributionSlice);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getApiDataList());
    };
    fetchData();
  }, [dispatch]);

  // При наведени появляется информация
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [hoveredContribution, setHoveredContribution] = useState<number | null>(
    null
  );

  const renderTable = () => {
    const today = new Date();
    const daysInWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    const startDate = new Date(today.getTime() - 50 * 7 * 24 * 60 * 60 * 1000);

    const tableRows = [];
    const currentDate = startDate;
    const currentDateStr = today.toISOString().slice(0, 10);

    const handleCellMouseEnter = (dateString: string, contribution: number) => {
      setHoveredDate(dateString);
      setHoveredContribution(contribution);
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

        let contributionLevel = <div className="square empty"></div>;
        if (dateString <= currentDateStr) {
          if (contribution >= 1 && contribution <= 9) {
            contributionLevel = <div className="square level-1"></div>;
          } else if (contribution >= 10 && contribution <= 19) {
            contributionLevel = <div className="square level-2"></div>;
          } else if (contribution >= 20 && contribution <= 29) {
            contributionLevel = <div className="square level-3"></div>;
          } else if (contribution >= 30) {
            contributionLevel = <div className="square level-4"></div>;
          }

          weekData.push(
            <td
              key={`${dateString}-${j}`}
              onMouseEnter={() =>
                handleCellMouseEnter(dateString, contribution)
              }
              onMouseLeave={handleCellMouseLeave}
              style={{ position: "relative" }}
            >
              {contributionLevel}
            </td>
          );
        }

        // Останавливаем цикл, когда достигли текущей даты
        if (currentDateStr === dateString) {
          break;
        }
      }
      tableRows.push(<tr key={i}>{weekData}</tr>);

      // Останавливаем цикл, когда достигли текущей даты
      if (currentDateStr === weekStartDate.toISOString().slice(0, 10)) {
        break;
      }
    }

    return tableRows;
  };

  return (
    <div className="container">
      <div className="frame">
        <table>
          <thead>
            <tr>
              <th colSpan={4}></th>
              <td colSpan={4}>Авг.</td>
              <td colSpan={4}>Сен.</td>
              <td colSpan={4}>Окт.</td>
              <td colSpan={4}>Ноя.</td>
              <td colSpan={4}>Дек.</td>
              <td colSpan={4}>Янв.</td>
              <td colSpan={4}>Фев.</td>
              <td colSpan={4}>Мар.</td>
              <td colSpan={4}>Апр.</td>
              <td colSpan={4}>Май</td>
              <td colSpan={4}>Июнь</td>
              <td colSpan={4}>Июль</td>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
        </table>
        <div className="ContributionContainer">
          <div className="ContributionLevelLine">
            <h5>Меньше</h5>
            <div className="square empty"></div>
            <div className="square level-1"></div>
            <div className="square level-2"></div>
            <div className="square level-3"></div>
            <div className="square level-4"></div>
            <h5>Больше</h5>
          </div>
        </div>
      </div>

      {hoveredContribution !== null && (
        <div className="DateContibution">
          <div className="TextContibution">
            {hoveredContribution} contribution
          </div>
          <div className="TextContibution">{hoveredDate}</div>
        </div>
      )}
    </div>
  );
};

export default Table;
