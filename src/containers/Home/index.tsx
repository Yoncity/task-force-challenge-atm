import { useState } from "react";
import Deposit from "../../components/actions/Deposit";
import Transactions from "../../components/actions/Transactions";
import Transfer from "../../components/actions/Transfer";
import Withdraw from "../../components/actions/Withdraw";
import Header from "../../components/Header";
import users from "../../constants/users";
import "./index.scss";
import { Redirect } from "react-router-dom";

const Home = (props) => {
  const [activeTab, setActiveTab] = useState<Number>(0);
  if (!props.location.state) return <Redirect to="/login" />;

  const {
    location: {
      state: { user },
    },
  } = props;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentUser, setCurrentUser] = useState(user);
  const selectTab = (tab) => {
    setActiveTab(tab);
  };

  const viewSelectedTab = () => {
    switch (activeTab) {
      case 0:
        return (
          <Deposit currentUser={currentUser} setCurrentUser={setCurrentUser} />
        );
      case 1:
        return (
          <Withdraw currentUser={currentUser} setCurrentUser={setCurrentUser} />
        );
      case 2:
        return (
          <Transfer
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            users={users}
          />
        );
      case 3:
        return <Transactions currentUser={currentUser} />;
      // case 4:
      //   return <Transfer />;
      default:
        return null;
    }
  };

  return (
    <div className="home_container">
      <Header currentUser={currentUser} />
      <div className="home_container__body">
        <div className="home_container__body__actions">
          <p onClick={() => selectTab(0)}>Deposit</p>
          <p onClick={() => selectTab(1)}>Withdraw</p>
          <p onClick={() => selectTab(2)}>Transfer</p>
          <p onClick={() => selectTab(3)}>Transactions</p>
          {/* <p onClick={() => selectTab(4)}>Settings</p> */}
        </div>

        <div className="home_container__body__content">{viewSelectedTab()}</div>
      </div>
    </div>
  );
};

export default Home;
