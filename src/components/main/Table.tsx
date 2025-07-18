import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoMdInformationCircle } from "react-icons/io";
import {
  HospitalBedOccupancyItem,
  IncomingPersonsItem,
  TrafficLightProgramItem,
  Table,
  TableColumn,
} from "../../models/table.model";
import MoreActionsButton from "./MoreActionsButton";
import { useCallback, useContext, useEffect, useState } from "react";
import ColorMap from "./ColorMap";
import { FaSearch } from "react-icons/fa";
import { languageContext } from "../../contexts/LanguageContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useLocation } from "react-router-dom";

const TableComponent = ({
  table,
  onRowClicked,
  rowActionsModalVisible,
}: {
  table: Table;
  onRowClicked?: (row) => void;
  rowActionsModalVisible: boolean;
}) => {
  const location = useLocation();
  const { themeColor } = useContext(ThemeContext);
  const { language } = useContext(languageContext);
  const englishMode = language === "english";
  const [selectedRows, setSelectedRows] = useState<
    | HospitalBedOccupancyItem[]
    | IncomingPersonsItem[]
    | TrafficLightProgramItem[]
  >(table.rows);
  const [selectedRowsOrdered, setSelectedRowsOrdered] = useState<
    | HospitalBedOccupancyItem[]
    | IncomingPersonsItem[]
    | TrafficLightProgramItem[]
  >(table.rows);
  const [filteredRows, setFilteredRows] = useState<
    | HospitalBedOccupancyItem[]
    | IncomingPersonsItem[]
    | TrafficLightProgramItem[]
  >(table.rows);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [markSelectedRow, setMarkSelectedRow] = useState<{
    [rowId: number]: any;
  }>(initMarkSelectedRowState());
  const [showTableFilterList, setShowTableFilterList] = useState(false);
  const getRowKey = useCallback(
    (row) => {
      if (table.type === "incomingPersons") {
        return englishMode
          ? (row as IncomingPersonsItem).srcCountryEnglish
          : (row as IncomingPersonsItem).srcCountry;
      } else if (table.type === "hospitalBedOccupancy") {
        return englishMode
          ? (row as HospitalBedOccupancyItem).hospitalNameEnglish
          : (row as HospitalBedOccupancyItem).hospitalName;
      } else if (table.type === "trafficLightProgram") {
        return englishMode
          ? (row as TrafficLightProgramItem).cityEnglish
          : (row as TrafficLightProgramItem).city;
      }
    },
    [table.type, englishMode]
  );
  const getFilterListCheckedBoxes = useCallback(() => {
    return Object.fromEntries(
      table.rows.map((row: any) => [getRowKey(row), true])
    );
  }, [table.rows, getRowKey]);
  const [filterListCheckedBoxes, setFilterListCheckedBoxes] = useState(
    getFilterListCheckedBoxes()
  );
  const levelsColors = {
    High: "red",
    Medium: "orange",
    Low: "yellow",
    None: "green",
  };

  useEffect(() => {
    setSelectedRows(table.rows);
    setSelectedRowsOrdered(table.rows);
  }, [table]);

  useEffect(() => {
    setFilterListCheckedBoxes(getFilterListCheckedBoxes());
  }, [language, getFilterListCheckedBoxes]);

  function initMarkSelectedRowState() {
    const data = {};
    table.rows.forEach((row) => {
      data[row.id] = {
        firstClick: false,
        secondClick: false,
      };
    });
    return data;
  }

  function onRowClickedHandler(row) {
    if (!location.pathname.includes("admin")) return;

    const rowClicks = { firstClick: false, secondClick: false };

    if (!markSelectedRow[row.id]?.firstClick) {
      rowClicks.firstClick = true;
    } else if (!markSelectedRow[row.id]?.secondClick) {
      rowClicks.firstClick = true;
      rowClicks.secondClick = true;
    }
    setMarkSelectedRow((prev) => {
      const newMarkSelectedRow = {};
      Object.keys(prev).forEach((rowId) => {
        if (rowId !== row.id) {
          newMarkSelectedRow[rowId] = { firstClick: false, secondClick: false };
        }
      });
      newMarkSelectedRow[row.id] = rowClicks;
      return newMarkSelectedRow;
    });

    onRowClicked?.(row);
  }

  function getDailyScoreColor(row, columnName) {
    const dailyScore = row[columnName];
    if (dailyScore > 7.5) {
      return "red";
    } else if (dailyScore > 6 && dailyScore < 7.5) {
      return "orange";
    } else if (dailyScore > 4.5 && dailyScore < 6) {
      return "yellow";
    } else return "green";
  }

  function roundNumberToTwoDigits(num: number) {
    // Check if the number has more than two digits after the decimal point
    const [, amountOFdigitsAfterPoint] = num.toString().split(".");
    if (!amountOFdigitsAfterPoint || amountOFdigitsAfterPoint.length <= 2)
      return num;

    return Math.round(num * 100) / 100;
  }

  function getFilterPlaceholder() {
    if (table.type === "incomingPersons") {
      return englishMode ? "countries" : "מדינות";
    } else if (table.type === "hospitalBedOccupancy") {
      return englishMode ? "hospitals" : "בתי חולים/מוסדות";
    } else if (table.type === "trafficLightProgram") {
      return englishMode ? "cities" : "יישובים";
    }
  }

  function handleCheckboxChange(
    changeEvent: React.ChangeEvent<HTMLInputElement>
  ) {
    setFilterListCheckedBoxes((prevCheckedBoxes) => ({
      ...prevCheckedBoxes,
      [changeEvent.target.id]: changeEvent.target.checked,
    }));
  }

  function renderRow(row) {
    return Object.keys(row).map((columnName) => {
      if (
        englishMode &&
        (columnName === "hospitalName" ||
          columnName === "city" ||
          columnName === "srcCountry")
      ) {
        return null;
      } else if (
        !englishMode &&
        (columnName === "hospitalNameEnglish" ||
          columnName === "cityEnglish" ||
          columnName === "srcCountryEnglish")
      ) {
        return null;
      }

      if (!row[columnName]) return <td>אין מידע</td>;
      else if (columnName === "id") return null;
      else if (columnName === "riskLevel") {
        return (
          <td className="level-square-container">
            <div
              className={`risk-level-square ${levelsColors[row[columnName]]}`}
            ></div>
          </td>
        );
      } else if (columnName === "dailyScore") {
        return (
          <td className="risk-level-square-container">
            <div
              className={`bold level-square-background ${getDailyScoreColor(
                row,
                columnName
              )}`}
            >
              {row[columnName]}
            </div>
          </td>
        );
      } else if (
        typeof row[columnName] === "number" &&
        table.columns.find((col) => col.key === columnName)?.inPercentages
      ) {
        return (
          <td className="bold">
            <div className="row-percentageNumber-field">
              {table.type === "hospitalBedOccupancy" && (
                <div className="percentage-bar">
                  <div
                    className="inner-bar"
                    style={{
                      width: `${row[columnName]}%`,
                    }}
                  />
                  <div
                    className="outer-bar"
                    style={{ width: `${100 - row[columnName]}%` }}
                  />
                </div>
              )}
              <div>{roundNumberToTwoDigits(row[columnName] as number)}%</div>
            </div>
          </td>
        );
      } else return <td className="bold">{row[columnName]}</td>;
    });
  }

  function sortRows(sortKey: string) {
    // Back to un-ordered state
    if (sortKey === sortColumn && sortDirection === "desc") {
      setSortColumn(null);
      setSortDirection(null);
      setSelectedRowsOrdered(selectedRows);
      return;
    }

    const direction =
      sortKey === sortColumn && sortDirection === "asc" ? "desc" : "asc";

    const sortedRows = [...selectedRows].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (typeof valA === "number" && typeof valB === "number") {
        return direction === "asc" ? valA - valB : valB - valA;
      } else {
        return direction === "asc"
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      }
    });

    setSortColumn(sortKey);
    setSortDirection(direction);
    setSelectedRowsOrdered(
      sortedRows as
        | HospitalBedOccupancyItem[]
        | IncomingPersonsItem[]
        | TrafficLightProgramItem[]
    );
  }

  function onSubmitFilteredRows() {
    const filteredRows = (
      table.rows as (
        | HospitalBedOccupancyItem
        | IncomingPersonsItem
        | TrafficLightProgramItem
      )[]
    ).filter((row) => filterListCheckedBoxes[getRowKey(row)] ?? false);
    setSelectedRows(
      filteredRows as
        | HospitalBedOccupancyItem[]
        | IncomingPersonsItem[]
        | TrafficLightProgramItem[]
    );
    setSelectedRowsOrdered(
      filteredRows as
        | HospitalBedOccupancyItem[]
        | IncomingPersonsItem[]
        | TrafficLightProgramItem[]
    );
    setShowTableFilterList(false);
  }

  function onChangeSearchBoxInput(event) {
    const filteredData = (
      table.rows as (
        | HospitalBedOccupancyItem
        | IncomingPersonsItem
        | TrafficLightProgramItem
      )[]
    ).filter((row) => getRowKey(row).includes(event.target.value));

    setFilteredRows(
      filteredData as
        | HospitalBedOccupancyItem[]
        | IncomingPersonsItem[]
        | TrafficLightProgramItem[]
    );
  }

  function isEnglishColumn(column: TableColumn): boolean {
    return column.keyEnglish === column.key;
  }

  return (
    <div className="card table-container">
      <div className="card__header">
        <div className="card__title bold line-height-2xl">
          {!englishMode ? table.title : table.titleEnglish}
        </div>

        <button className="card__more-info_btn">
          <IoMdInformationCircle
            color={`${themeColor === "light" ? "black" : "white"}`}
          />
        </button>

        <div className="card__more-info_content-container">
          <div className="card__more-info_content">
            {!englishMode ? table.description : table.descriptionEnglish}
          </div>
        </div>

        <MoreActionsButton></MoreActionsButton>
      </div>

      <div className="table-filter-container">
        <div
          className={`table-filter__selectBtn ${
            showTableFilterList ? "clicked-filter-border" : ""
          }`}
          onClick={() => setShowTableFilterList(!showTableFilterList)}
        >
          {`${selectedRows.length} ${getFilterPlaceholder()} ${
            englishMode ? "selected" : "נבחרו"
          }`}
          {showTableFilterList && (
            <IoIosArrowUp className="table-filter__selectBtn_arrow" />
          )}
          {!showTableFilterList && (
            <IoIosArrowDown className="table-filter__selectBtn_arrow" />
          )}
        </div>

        {showTableFilterList && (
          <div className="table-filter__list">
            <div className="table-filter__list-buttons">
              <button onClick={() => setFilterListCheckedBoxes({})}>
                {englishMode ? "clear" : "נקה"}
              </button>
              <button
                onClick={() =>
                  setFilterListCheckedBoxes(
                    Object.fromEntries(
                      table.rows.map((row) => [getRowKey(row), true])
                    )
                  )
                }
              >
                {englishMode ? "select all" : "בחר הכל"}
              </button>
            </div>

            <div className="table-filter__list-search-container">
              <input
                type="text"
                onChange={onChangeSearchBoxInput}
                placeholder={`${
                  englishMode ? "search" : "חפש"
                } ${getFilterPlaceholder()}`}
                className="table-filter__list-search-box"
              />
              <div className="search-icon">
                <FaSearch />
              </div>
            </div>

            <div className="table-filter__list-rows">
              {filteredRows.map((row) => (
                <div className="table-filter__list-rows__item">
                  <input
                    type="checkbox"
                    id={getRowKey(row) + ""}
                    checked={filterListCheckedBoxes?.[getRowKey(row)] ?? false}
                    onChange={handleCheckboxChange}
                  />
                  <div>{getRowKey(row)}</div>
                </div>
              ))}
            </div>

            <div className="table-filter__list-buttons">
              <button
                onClick={() => {
                  onSubmitFilteredRows();
                  setFilteredRows(table.rows);
                }}
              >
                {englishMode ? "apply" : "החל"}
              </button>
              <button
                onClick={() => {
                  setShowTableFilterList(false);
                  setFilteredRows(table.rows);
                  setFilterListCheckedBoxes(
                    Object.fromEntries(
                      selectedRows.map((row) => [getRowKey(row), true])
                    )
                  );
                }}
              >
                {englishMode ? "cancel" : "ביטול"}
              </button>
            </div>
          </div>
        )}
      </div>

      {(table.type === "incomingPersons" ||
        table.type === "trafficLightProgram") && (
        <ColorMap colorsMap={levelsColors} tableType={table.type} />
      )}

      <div className="table-rows">
        <table>
          <thead>
            <tr>
              {table.columns.map((column) =>
                isEnglishColumn(column) ? null : (
                  <th
                    className={`${
                      column.key === sortColumn
                        ? `column-${sortDirection}-order-color`
                        : "medium"
                    }`}
                    onClick={() => sortRows(column.key)}
                  >
                    {englishMode ? column.valueEnglish : column.value}
                    {sortDirection === "desc" && sortColumn === column.key && (
                      <IoIosArrowDown className="arrow-btn" />
                    )}
                    {sortDirection === "asc" && sortColumn === column.key && (
                      <IoIosArrowUp className="arrow-btn" />
                    )}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {selectedRowsOrdered.map((row) => (
              <tr
                onClick={() => onRowClickedHandler(row)}
                tabIndex={0}
                className={`${
                  markSelectedRow[row.id]?.firstClick ? "selected-first" : ""
                } ${
                  rowActionsModalVisible && markSelectedRow[row.id]?.secondClick
                    ? "selected-second"
                    : ""
                }`}
              >
                {renderRow(row)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
