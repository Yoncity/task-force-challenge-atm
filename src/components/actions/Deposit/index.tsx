import { useState } from "react";
import { UserModel } from "../../../constants/users";
import Modal from "../../common/Modal";
import TextField from "../../TextField";
import "./index.scss";

type Props = {
  currentUser: UserModel;
  setCurrentUser: any;
};

const Deposit: React.FC<Props> = ({ currentUser, setCurrentUser }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showChequeModal, setShowChequeModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [chequeNo, setChequeNo] = useState<string>("");
  const [chequeAmount, setChequeAmount] = useState<Number>();

  const [tab, setTab] = useState(0);

  const handleChange = ({ target: { name, value } }) => {
    if (name === "chequeNo") {
      setChequeNo(value);
    } else {
      setDepositAmount(value);
    }

    const k = Number(value);
    if (isNaN(k)) {
      setError("Please use only numbers");
    } else setError("");
  };

  const proceedToDeposit = () => {
    if (!error) {
      const cheque = currentUser.cheques.find((c) => c.no === chequeNo);
      if (tab === 1) {
        if (cheque) {
          if (!cheque.active) {
            setError("Cheque is already Used");
            setShowErrorModal(true);
          } else {
            setChequeAmount(cheque.amount);
            setShowChequeModal(true);
          }
        } else {
          setError("Cheque is not valid");
          setShowErrorModal(true);
        }
      } else {
        setError("");
        setShowModal(true);
      }
    } else setShowErrorModal(true);
  };

  const cashOrCheque = () => {
    if (tab === 0) {
      return (
        <>
          <p className="deposit_container__body__info">
            Fill out the amount below to deposit to your account.
          </p>
          <div className="deposit_container__body__fields">
            <TextField
              error={error ? true : false}
              labelText="Amount"
              name="amount"
              type="text"
              formId="depositAmount"
              value={depositAmount}
              onChange={handleChange}
            />
            <input type="submit" value="PROCEED" onClick={proceedToDeposit} />
          </div>
        </>
      );
    } else
      return (
        <>
          <p className="deposit_container__body__info">
            Fill out the cheque details below to deposit to your account.
          </p>
          <div className="deposit_container__body__fields">
            <TextField
              error={error ? true : false}
              labelText="Cheque Number"
              name="chequeNo"
              type="text"
              formId="chequeNo"
              value={chequeNo}
              onChange={handleChange}
            />
            <input type="submit" value="PROCEED" onClick={proceedToDeposit} />
          </div>
        </>
      );
  };

  return (
    <div className="deposit_container">
      <div className="deposit_container__header">
        <p className="deposit_container__header__title">Deposit</p>
        <div className="deposit_container__header__tabs">
          <p
            className={`deposit_container__header__tabs__tab ${
              tab === 0 ? "active" : ""
            }`}
            onClick={() => setTab(0)}
          >
            Cash
          </p>
          <p
            className={`deposit_container__header__tabs__tab ${
              tab === 1 ? "active" : ""
            }`}
            onClick={() => setTab(1)}
          >
            Cheque
          </p>
        </div>
      </div>
      <div className="deposit_container__body">{cashOrCheque()}</div>

      <Modal
        header="Confirm Deposit"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <p>Are you sure you want to deposit ${depositAmount}</p>
        <div className="modal_actions">
          <p
            className="success"
            onClick={() => {
              currentUser.balance = currentUser.balance + Number(depositAmount);

              currentUser.tranactions.push({
                amount: String(depositAmount),
                dateTime: new Date().toUTCString(),
                name: "Cash Deposit",
              });
              setDepositAmount("");
              setCurrentUser({ ...currentUser });
              setShowModal(false);
            }}
          >
            Yes
          </p>
          <p className="cancel" onClick={() => setShowModal(false)}>
            No
          </p>
        </div>
      </Modal>

      <Modal
        header="Confirm Deposit with Cheque"
        showModal={showChequeModal}
        setShowModal={setShowChequeModal}
      >
        <p>You are about to deposit ${chequeAmount} from cheque.</p>
        <div className="modal_actions">
          <p
            className="success"
            onClick={() => {
              currentUser.balance = currentUser.balance + Number(chequeAmount);
              currentUser.cheques.map((c) => {
                if (c.no === chequeNo) {
                  c.active = false;
                }
              });

              currentUser.tranactions.push({
                amount: String(chequeAmount),
                dateTime: new Date().toUTCString(),
                name: "Cheque Deposit",
              });
              setDepositAmount("");
              setCurrentUser({ ...currentUser });
              setShowChequeModal(false);
            }}
          >
            Proceed
          </p>
          <p className="cancel" onClick={() => setShowChequeModal(false)}>
            Cancel
          </p>
        </div>
      </Modal>

      <Modal
        header="Deposit Failed"
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
      >
        {error}
      </Modal>
    </div>
  );
};

export default Deposit;
