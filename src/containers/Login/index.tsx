import { useState } from "react";
import TextField from "../../components/TextField";
import users from "../../constants/users";
import { useHistory } from "react-router-dom";
import "./index.scss";

const Login = () => {
  const [cardsBlocked, setCardsBlocked] = useState([""]);

  const [showPin, setShowPin] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    csv: "",
    pin: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = ({ target: { name, value } }) => {
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const { push } = useHistory();

  const authenticate = () => {
    if (showPin) {
      const userFound = users.find(
        (user) =>
          user.card.no === cardDetails.cardNumber &&
          user.card.expiry === cardDetails.expiry &&
          user.card.csv === cardDetails.csv
      );
      if (userFound) {
        if (userFound.pin === cardDetails.pin) {
          push({ pathname: "/", state: { user: userFound } });
        } else {
          if (userFound.card.blocked > 0) {
            setError(
              `PIN does not match, ${userFound.card.blocked} tries left`
            );
            userFound.card.blocked = Number(userFound.card.blocked) - 1;
          } else {
            setShowPin(false);
            setError("CARD has been blocked");
            setCardsBlocked([...cardsBlocked, cardDetails.cardNumber]);
          }
        }

        if (!error) {
        }
      }
    } else {
      if (cardsBlocked.includes(cardDetails.cardNumber)) {
        setError("CARD has been blocked");
      } else {
        const userFound = users.find(
          (user) =>
            user.card.no === cardDetails.cardNumber &&
            user.card.expiry === cardDetails.expiry &&
            user.card.csv === cardDetails.csv
        );
        if (userFound) {
          setError("");
          setShowPin(true);
        } else setError("Not able to find the card");
      }
    }
  };

  return (
    <div className="login_container">
      <div className="login_container__left">
        {/* <img src={card} alt="Card" className="login_container__left__card" /> */}
        {error && <p className="login_container__left__error">{error}</p>}
        {showPin && (
          <div className="login_container__pin">
            <TextField
              labelText="PIN"
              name="pin"
              type="text"
              formId="pin"
              value={cardDetails.pin}
              onChange={handleChange}
            />
          </div>
        )}

        {!showPin && (
          <div className="login_container__left__card_details">
            <TextField
              labelText="Card Number"
              name="cardNumber"
              type="text"
              formId="chequeNo"
              value={cardDetails.cardNumber}
              onChange={handleChange}
            />

            <div className="login_container__left__card_details__group">
              <TextField
                labelText="MM/YY"
                name="expiry"
                type="text"
                formId="expiry"
                value={cardDetails.expiry}
                onChange={handleChange}
              />

              <TextField
                labelText="CSV"
                name="csv"
                type="text"
                formId="csv"
                value={cardDetails.csv}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        <div className="login_container__left__actions">
          {showPin && (
            <input
              type="submit"
              value="Back"
              onClick={() => setShowPin(false)}
            />
          )}
          <input
            type="submit"
            className="proceedButton"
            value="PROCEED"
            onClick={authenticate}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
