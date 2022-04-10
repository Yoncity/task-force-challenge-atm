type TransactionsModel = {
  name: string;
  amount: string;
  dateTime: string;
};

type ChequeModel = {
  no: string;
  amount: Number;
  active: boolean;
};

type CreditCard = {
  no: string;
  expiry: string;
  csv: string;
  blocked: Number;
};

export type UserModel = {
  firstName: string;
  lastName: string;
  card: CreditCard;
  account: string;
  pin: string;
  balance: number;
  tranactions: Array<TransactionsModel>;
  cheques: Array<ChequeModel>;
};

const users: Array<UserModel> = [
  {
    firstName: "Yonatan",
    lastName: "Dawit",
    card: {
      no: "1234 5678 9012 3456",
      expiry: "11/23",
      csv: "123",
      blocked: 3,
    },
    pin: "1234",
    account: "1234567890",
    balance: 120000,
    tranactions: [
      {
        name: "Withdraw",
        amount: "345",
        dateTime: new Date().toUTCString(),
      },
      {
        name: "Deposit",
        amount: "345",
        dateTime: new Date().toUTCString(),
      },
      {
        name: "Withdraw",
        amount: "345",
        dateTime: new Date().toUTCString(),
      },
      {
        name: "Withdraw",
        amount: "345",
        dateTime: new Date().toUTCString(),
      },
      {
        name: "Deposit",
        amount: "345",
        dateTime: new Date().toUTCString(),
      },
      {
        name: "Withdraw",
        amount: "345",
        dateTime: new Date().toUTCString(),
      },
      {
        name: "Withdraw",
        amount: "345",
        dateTime: new Date().toUTCString(),
      },
      {
        name: "Deposit",
        amount: "345",
        dateTime: new Date().toUTCString(),
      },
      {
        name: "Withdraw",
        amount: "345",
        dateTime: new Date().toUTCString(),
      },
      {
        name: "Withdraw",
        amount: "345",
        dateTime: new Date().toUTCString(),
      },
      {
        name: "Deposit",
        amount: "345",
        dateTime: new Date().toUTCString(),
      },
      {
        name: "Withdraw",
        amount: "345",
        dateTime: new Date().toUTCString(),
      },
      {
        name: "Withdraw",
        amount: "345",
        dateTime: new Date().toUTCString(),
      },
      {
        name: "Deposit",
        amount: "345",
        dateTime: new Date().toUTCString(),
      },
      {
        name: "Withdraw",
        amount: "345",
        dateTime: new Date().toUTCString(),
      },
    ],
    cheques: [
      {
        no: "123456789",
        amount: 2000,
        active: true,
      },
      {
        no: "987654321",
        amount: 1000,
        active: true,
      },
    ],
  },
  {
    firstName: "Naod",
    lastName: "Dawit",
    card: {
      no: "9876 5432 1098 7654",
      expiry: "11/23",
      csv: "123",
      blocked: 3,
    },
    account: "0987654321",
    pin: "1234",
    balance: 1000,
    tranactions: [],
    cheques: [],
  },
];

export default users;
