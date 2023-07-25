import React from "react";

interface ContributionLevelProps {
  level: number;
}

const ContributionLevel: React.FC<ContributionLevelProps> = ({ level }) => {
  const contributionLevels = [
    <div className="square empty" key={0}></div>,
    <div className="square level-1" key={1}></div>,
    <div className="square level-2" key={2}></div>,
    <div className="square level-3" key={3}></div>,
    <div className="square level-4" key={4}></div>,
  ];

  return contributionLevels[level] || null;
};

export default ContributionLevel;
