import { useState } from "react";
import { UserModel } from "../../../constants/users";
import TextField from "../../TextField";
import "./index.scss";

type Props = {
  currentUser: UserModel;
};

const Transactions: React.FC<Props> = ({ currentUser }) => {
  currentUser.tranactions.reverse();
  return (
    <div className="transactions_container">
      <p className="transactions_container__header">Transactions</p>
      <div className="transactions_container__body_header">
        <p className="transactions_container__body_header__name">Name</p>
        <p className="transactions_container__body_header__amount">Amount</p>
        <p className="transactions_container__body_header__dateTime">
          Date And Time
        </p>
      </div>
      <div className="transactions_container__body">
        {currentUser.tranactions.map((item) => (
          <div className="transactions_container__body__transaction">
            <p className="transactions_container__body__transaction__name">
              {item.name}
            </p>
            <p className="transactions_container__body__transaction__amount">
              ${item.amount}
            </p>
            <p className="transactions_container__body__transaction__dateTime">
              {item.dateTime}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
