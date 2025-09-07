import { GoCircle, GoX } from "react-icons/go";
import type { UIGameStatus } from "../App";

const TicTacToeCell = ({
  element,
  onClick,
  gameStatus,
}: {
  element: "O" | "X" | null | undefined;
  onClick?: React.MouseEventHandler<HTMLTableDataCellElement>;
  gameStatus: UIGameStatus;
}) => {
  return (
    <td
      className={`border-4 border-stone-950 w-30 h-30 ${
        gameStatus === "ONGOING" &&
        element === null &&
        "cursor-pointer hover:bg-stone-300"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center">
        {element === "X" && <GoX size={100} />}
        {element === "O" && <GoCircle size={78} />}
      </div>
    </td>
  );
};

export default TicTacToeCell;
