import { useContext, useState } from "react";
import { DataContext } from "../../contexts/DataContext";
import { IoIosArrowDown } from "react-icons/io";
import { languageContext } from "../../contexts/LanguageContext";

const TimeTableFilter = ({ sectionId, cardId }) => {
  const { onChangeGraphDataTimeRange } = useContext(DataContext);
  const [showTable, setShowTable] = useState(false);
  const timeRanges = [
    {
      key: "lastMonth",
      filePrefix: "last-month",
      valueHebrew: "חודש אחרון",
      valueEnglish: "Last month",
    },
    {
      key: "last3Months",
      filePrefix: "last-3-months",
      valueHebrew: "3 חודשים",
      valueEnglish: "Last 3 months",
    },
    {
      key: "last6Months",
      filePrefix: "last-6-months",
      valueHebrew: "6 חודשים",
      valueEnglish: "Last 6 months",
    },
    {
      key: "lastYear",
      filePrefix: "last-year",
      valueHebrew: "שנה",
      valueEnglish: "Last year",
    },
    {
      key: "all",
      filePrefix: "all",
      valueHebrew: "עד עכשיו",
      valueEnglish: "All",
    },
  ];
  const [displayedTimeRange, setDisplayedTimeRange] = useState(timeRanges[0]);
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRanges[0]);
  const { language } = useContext(languageContext);
  const englishMode = language === "english";

  function handleSubmit(event) {
    event.preventDefault();
    setDisplayedTimeRange(selectedTimeRange);
    onChangeGraphDataTimeRange(sectionId, cardId, selectedTimeRange.filePrefix);
    setShowTable(false);
  }

  return (
    <div className="filter-table">
      <div
        className="table__current font-sm"
        onClick={() => setShowTable(!showTable)}
      >
        <span>
          {englishMode
            ? displayedTimeRange.valueEnglish
            : displayedTimeRange.valueHebrew}
        </span>
        <IoIosArrowDown />
      </div>

      {showTable && (
        <form onSubmit={handleSubmit} className="filter-table__form">
          <div className="form-title bold font-sm">
            {englishMode ? "time" : "זמן"}
          </div>

          <div className="form-inputs">
            {timeRanges.map((range) => (
              <div className="form-input font-sm" key={range.key}>
                <input
                  type="radio"
                  checked={selectedTimeRange.filePrefix === range.filePrefix}
                  onChange={() => {
                    setSelectedTimeRange(range);
                  }}
                />
                <label>
                  {englishMode ? range.valueEnglish : range.valueHebrew}
                </label>
              </div>
            ))}
          </div>

          <div className="form-buttons">
            <button type="submit">{englishMode ? "Apply" : "אישור"}</button>
            <button type="button" onClick={() => setShowTable(false)}>
              {englishMode ? "Cancel" : "ביטול"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TimeTableFilter;
