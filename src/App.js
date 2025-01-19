// App.js
import React, { useState } from 'react';
import MenuLeft from './components/Menuleft';
import { useLocation } from 'react-router-dom';
import MenuLeftAccount from './MenuLeftAccount';
import { UserContext } from './UserContext';
import Header from './components/Layout/Header';
import { Provider } from 'react-redux';

function App(props) {
      const [context, setContext] = useState([0, 0])
      let params1 = useLocation();
      let isAccountPage = params1['pathname'].includes("account")
      let isCartPage = params1['pathname'].includes("cart")
      // console.log(params1) 

      if (isCartPage)
            return (
                  <UserContext.Provider value={[context, setContext]} >
                        <Header />
                        <div className='container'>
                              <div className='row'>{props.children}</div>
                        </div>
                  </UserContext.Provider>
            )
            

      return (
            <>
                  <UserContext.Provider value={[context, setContext]}>
                        <Header />
                        <div className='container'>
                              <div className='row'>
                                    {isAccountPage ? <MenuLeftAccount /> : <MenuLeft />}
                                    {props.children}
                              </div>
                        </div>
                  </UserContext.Provider>
                  
                 
            </>
      );
}

export default App;
