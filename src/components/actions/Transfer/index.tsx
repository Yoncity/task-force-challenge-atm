import "./index.scss";
import { useState } from "react";
import TextField from "../../TextField";
import "./index.scss";
import Modal from "../../common/Modal";
import { UserModel } from "../../../constants/users";
type Props = {
  currentUser: UserModel;
  setCurrentUser: any;
  users: Array<UserModel>;
};

const Transfer: React.FC<Props> = ({ currentUser, setCurrentUser, users }) => {
  const [transfer, setTransfer] = useState({
    account: "",
    amount: "",
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = ({ target: { name, value } }) => {
    setTransfer({ ...transfer, [name]: value });

    const k = Number(value);
    if (isNaN(k)) {
      setError("Please use only numbers");
    } else if (name === "amount" && k > currentUser.balance) {
      setError("Insufficent funds.");
    } else setError("");
  };

  const proceedToTransfer = () => {
    if (!error && transfer.account && transfer.amount) {
      const accountFound = users.find(
        (user) => user.account === transfer.account
      );
      if (accountFound) {
        setError("");
        setShowModal(true);
      } else {
        setError("Account is invalid");
        setShowErrorModal(true);
      }
    } else setShowErrorModal(true);
  };

  return (
    <div className="transfer_container">
      <p className="transfer_container__header">Transfer</p>
      <p className="transfer_container__info">
        Fill out account number and amount you wish to transfer below.
      </p>
      <div className="transfer_container__fields">
        <TextField
          labelText="Account"
          name="account"
          type="text"
          formId="transferAccount"
          value={transfer.account}
          onChange={handleChange}
        />
        <TextField
          error={error ? true : false}
          labelText="Amount"
          name="amount"
          type="text"
          formId="transferAmount"
          value={transfer.amount}
          onChange={handleChange}
        />
        <input type="submit" value="PROCEED" onClick={proceedToTransfer} />
      </div>

      <Modal
        header="Confirm Transfer"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <p>
          Are you sure you want to transfer $<b>{transfer.amount}</b> to Account
          Number <b>{transfer.account}</b>
        </p>
        <div className="modal_actions">
          <p
            className="success"
            onClick={() => {
              users.map((user) => {
                if (user.account === transfer.account) {
                  user.balance = Number(user.balance) + Number(transfer.amount);
                  currentUser.balance =
                    Number(currentUser.balance) - Number(transfer.amount);
                }
              });

              currentUser.balance =
                currentUser.balance - Number(transfer.amount);

              currentUser.tranactions.push({
                amount: String(transfer.amount),
                dateTime: new Date().toUTCString(),
                name: `Transferred to ${transfer.account}`,
              });

              setTransfer({ account: "", amount: "" });
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
        header="Transfer Failed"
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
      >
        {error}
      </Modal>
    </div>
  );
};

export default Transfer;
