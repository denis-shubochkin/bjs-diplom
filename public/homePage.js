"use strict";

const logoutB = new LogoutButton();

//(response) => console.log(response)

logoutB.action = () => ApiConnector.logout(() => location.reload());
// ApiConnector.current((response) => 
//                                 {
//                                     if (response.success) {ProfileWidget.showProfile(response.data);}
//                                 });
                          
//ivan@demo.ru

const showProfile = (responsedata) => {
    if (!responsedata)   {
      ApiConnector.current( response =>
        {
          if (response.success) {
            ProfileWidget.showProfile(response.data);
          }
        } );
      } else {
        ProfileWidget.showProfile(responsedata);
      }
    }

showProfile();  

const ratesBoard = new RatesBoard();
const runRate = () => ApiConnector.getStocks((response) => 
    {
        if (response.success) 
            {
                ratesBoard.clearTable();
                ratesBoard.fillTable(response.data);
            }
    });

runRate();                        
setInterval(runRate,60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => 
    { 
        ApiConnector.addMoney(data,(response) =>
            {
                if (!response.success) 
                    {
                        moneyManager.setMessage(true,response.data);
                    }
                else 
                    {                                                 
                        moneyManager.setMessage(false,'Баланс успешно пополнен');
                        showProfile(response.data);
                    }
            })            
    };
moneyManager.conversionMoneyCallback = (data) =>    
    { 
        ApiConnector.convertMoney(data,(response) =>                                                                                  
            {
                if (!response.success) 
                    {
                        moneyManager.setMessage(true,response.data);
                    }
                else 
                    {                                                               
                        moneyManager.setMessage(false,'Конвертация успешно произведена');
                        showProfile(response.data);
                    }                                                                              
            });                                                                            
    }

moneyManager.sendMoneyCallback  = (data) => 
    { 
        ApiConnector.transferMoney(data,(response) =>                                                                                  
            {
                if (!response.success) 
                    {
                        moneyManager.setMessage(true,response.data);
                    }
                else 
                    {
                        showProfile(response.data);
                        moneyManager.setMessage(false,'Перевод успешно произведен');
                    }                                                                              
            });                                                                            
    }                                       
const favoritesWidget = new FavoritesWidget();
const updateFavorites = (data) => 
    {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(data);
        moneyManager.updateUsersList(data);
    }
ApiConnector.getFavorites(response => 
    {
        if (response.success) {updateFavorites(response.data);}
    });     

favoritesWidget.addUserCallback = (data) => 
    { 
        ApiConnector.addUserToFavorites(data,(response) =>                                                                                  
            {
                if (!response.success) 
                    {
                        favoritesWidget.setMessage(true,response.data);
                    }
                else 
                    {
                        updateFavorites(response.data);
                        favoritesWidget.setMessage(false,'Пользователь добавлен');
                    }
            });
    }

favoritesWidget.removeUserCallback = (data) =>  
    { 
        ApiConnector.removeUserFromFavorites(data,(response) =>                                                                                  
            {
                if (!response.success) 
                    {
                        favoritesWidget.setMessage(true,response.data);
                    }
                else 
                    {
                        updateFavorites(response.data);
                        favoritesWidget.setMessage(false,'Пользователь удален');
                    }
            });
    }                                          

