import { useContext } from "react";
import { CiShare2 } from "react-icons/ci";
import { FiMoreVertical } from "react-icons/fi";
import { IoIosArrowRoundDown } from "react-icons/io";
import { languageContext } from "../../contexts/LanguageContext";

const MoreActionsButton = () => {
  const { language } = useContext(languageContext);

  return (
    <>
      <button className="card__actions-button">
        <FiMoreVertical />
      </button>

      <ul className="card__actions-list">
        <li className="card__action-item">
          <button>
            <CiShare2 />
          </button>
          <span className="action-item-text">
            {language === "hebrew" ? "שיתוף" : "share"}
          </span>
        </li>

        <li className="card__action-item">
          <button>
            <IoIosArrowRoundDown />
          </button>
          <span className="action-item-text">
            {language === "hebrew" ? "הורדה" : "download"}
          </span>
        </li>
      </ul>
    </>
  );
};

export default MoreActionsButton;
