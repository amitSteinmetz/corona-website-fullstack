import { useContext, useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { FiMoreVertical } from "react-icons/fi";
import { IoIosArrowRoundDown } from "react-icons/io";
import { languageContext } from "../../contexts/LanguageContext";

const MoreActionsButton = () => {
  const [showCardActions, setShowCardActions] = useState(false);
  const { language } = useContext(languageContext);

  return (
    <>
      <button
        className="card__actions-button"
        onClick={() => {
          setShowCardActions(!showCardActions);
        }}
      >
        <FiMoreVertical />
      </button>

      {showCardActions && (
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
      )}
    </>
  );
};

export default MoreActionsButton;
