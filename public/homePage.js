const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout(() => window.location.reload());
};

ApiConnector.current((result) => {
  if (result.success) {
    ProfileWidget.showProfile(result.data);
  }
});

const ratesBoard = new RatesBoard();

const getCurrencies = () => ApiConnector.getStocks((stocks) => {
  if (stocks.success) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(stocks.data);
  }
});
getCurrencies();
setInterval(getCurrencies, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (result) => {
    if (result.success) {
      return ProfileWidget.showProfile(result.data);
    }
    return moneyManager.setMessage(result.success, result.error);
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (result) => {
    if (result.success) {
      return ProfileWidget.showProfile(result.data);
    }
    return moneyManager.setMessage(result.success, result.error);
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (result) => {
    if (result.success) {
      return ProfileWidget.showProfile(result.data);
    }
    return moneyManager.setMessage(result.success, result.error);
  });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((result) => {
  if (result.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(result.data);
    moneyManager.updateUsersList(result.data);
  }
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (result) => {
    if (result.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(result.data);
      moneyManager.updateUsersList(result.data);
      return;
    }
    favoritesWidget.setMessage(result.success, result.error);
  });
};

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (result) => {
    if (result.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(result.data);
      moneyManager.updateUsersList(result.data);
      return;
    }
    favoritesWidget.setMessage(result.success, result.error);
  });
};
