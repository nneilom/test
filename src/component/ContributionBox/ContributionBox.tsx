const ContributionBox = () => {
  return (
    <>
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
    </>
  );
};
export default ContributionBox;
