import React, { useState } from "react";
import "./ContributionBox.css";

const ContributionBox = () => {
  const [hoveredCellCoords, setHoveredCellCoords] = useState({ x: 0, y: 0 });
  const [hoveredContribution, setHoveredContribution] = useState<number | null>(
    null
  );

  const handleCellMouseEnter = (
    contribution: number,
    event: React.MouseEvent
  ) => {
    setHoveredContribution(contribution);
    const coordination = event.currentTarget.getBoundingClientRect();
    setHoveredCellCoords({ x: coordination.left, y: coordination.top });
  };

  const handleCellMouseLeave = () => {
    setHoveredContribution(null);
  };

  const contributionDescriptions: { [key: number]: string } = {
    0: "No contributions",
    1: "1-9 contributions",
    2: "10-19 contributions",
    3: "20-29 contributions",
    4: "30+ contributions",
  };

  return (
    <>
      <div className="ContributionContainer-box">
        <div className="ContributionLevel-line">
          <h5>Меньше</h5>
          <div
            className="square-con empty"
            onMouseEnter={(event) => handleCellMouseEnter(0, event)}
            onMouseLeave={handleCellMouseLeave}
          ></div>
          <div
            className="square-con level-1"
            onMouseEnter={(event) => handleCellMouseEnter(1, event)}
            onMouseLeave={handleCellMouseLeave}
          ></div>
          <div
            className="square-con level-2"
            onMouseEnter={(event) => handleCellMouseEnter(2, event)}
            onMouseLeave={handleCellMouseLeave}
          ></div>
          <div
            className="square-con level-3"
            onMouseEnter={(event) => handleCellMouseEnter(3, event)}
            onMouseLeave={handleCellMouseLeave}
          ></div>
          <div
            className="square-con level-4"
            onMouseEnter={(event) => handleCellMouseEnter(4, event)}
            onMouseLeave={handleCellMouseLeave}
          ></div>
          <h5>Больше</h5>
        </div>
      </div>

      {hoveredContribution !== null && (
        <div
          className="TextContibution-color light DateContibution-color"
          style={{
            top: hoveredCellCoords.y - 60,
            left: hoveredCellCoords.x - 90,
          }}
        >
          {contributionDescriptions[hoveredContribution]}

          <div className="Pointer"></div>
        </div>
      )}
    </>
  );
};

export default ContributionBox;
