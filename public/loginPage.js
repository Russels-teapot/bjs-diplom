'use strict'

const userForm = new UserForm;

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (result) => {
    if (result.success) {
      return location.reload();
    }
    userForm.setLoginErrorMessage(result.error)
  })
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (result)=> {
    if (result.success) {
      return location.reload();
    }
    userForm.setRegisterErrorMessage(result.error)
  })
};
