"use strict";

const userForm = new UserForm();




userForm.loginFormCallback = data => 
    {
        ApiConnector.login(data,(response) =>   
            {
                if (response.success) 
                    {
                        location.reload();
                    }
                else 
                    {
                        userForm.setLoginErrorMessage(response.data);
                    } 
            });
    };
userForm.registerFormCallback = data => 
    {
        ApiConnector.register(data, (response) =>   
            {
                if (response.success)
                    {                                                                                                                                                                                      
                        userForm.setRegisterErrorMessage(`Пользователь ${data.login} успешно зарегестрирован`);
                    }
                                                                                    
                else 
                    {
                    userForm.setRegisterErrorMessage(response.data);
                    }
            })
    };
//userForm.registerFormCallback = data => {ApiConnector.register(data, (response) => console.log(response))};


//data => {ApiConnector.login(data,log_check)};

