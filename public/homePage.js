'use strict'

const logoutButton = new LogoutButton;
logoutButton.action = () => {
    ApiConnector.logout(() => location.reload());
}

ApiConnector.current((result) => {
    if(result.success) {
        ProfileWidget.showProfile(result.data)
    }
})