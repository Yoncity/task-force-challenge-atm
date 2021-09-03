import { useState } from "react";
import Modal from "../../common/Modal";
import TextField from "../../TextField";
import "./index.scss";

const Withdraw = ({ currentUser, setCurrentUser }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

  const handleChange = ({ target: { value } }) => {
    setWithdrawAmount(value);

    const k = Number(value);
    if (isNaN(k)) {
      setError("Please use only numbers");
    } else if (k > currentUser.balance) {
      setError("Insufficent funds.");
    } else setError("");
  };

  const proceedToWithdraw = () => {
    if (!error) {
      setShowModal(true);
    } else setShowErrorModal(true);
  };

  return (
    <>
      <div className="withdraw_container">
        <p className="withdraw_container__header">Withdraw</p>
        <p className="withdraw_container__info">
          Fill out the amount below to withdraw from your account.
        </p>
        <div className="withdraw_container__fields">
          <TextField
            error={error ? true : false}
            labelText="Amount"
            name="amount"
            type="text"
            formId="withdrawAmount"
            value={withdrawAmount}
            onChange={handleChange}
          />
          <input
            type="submit"
            value="PROCEED"
            onClick={proceedToWithdraw}
            disabled={withdrawAmount ? false : true}
          />
        </div>
      </div>

      <Modal
        header="Confirm Withdrawal"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <p>Are you sure you want to withdraw ${withdrawAmount}</p>
        <div className="modal_actions">
          <p
            className="success"
            onClick={() => {
              currentUser.balance =
                currentUser.balance - Number(withdrawAmount);
              currentUser.tranactions.push({
                amount: String(withdrawAmount),
                dateTime: new Date().toUTCString(),
                name: "Withdraw",
              });
              setCurrentUser({ ...currentUser });
              setWithdrawAmount("");
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
        header="Withdraw Failed"
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
      >
        {error}
      </Modal>
    </>
  );
};

export default Withdraw;
