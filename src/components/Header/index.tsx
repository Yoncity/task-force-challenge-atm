import "./index.scss";
import { useHistory } from "react-router-dom";

const Header = ({ currentUser }) => {
  const { push } = useHistory();
  return (
    <div className="header_container">
      <p className="header_container__logo">MoBa</p>
      <div className="header_container__balance">
        <p className="header_container__balance__title">Balance:</p>
        <span className="header_container__balance__value">
          ${Number(currentUser.balance).toLocaleString()}
        </span>
      </div>
      <p className="header_container__logout" onClick={() => push("/login")}>
        LOGOUT
      </p>
    </div>
  );
};

export default Header;
