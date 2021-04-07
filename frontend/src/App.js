import './App.css';
import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import sales from './pages/sales';
import reports from './pages/reports';
import information from './pages/information';
import account from './pages/account';
import settings from './pages/settings';
import addproduct from './pages/addproduct';
import addpartner from './pages/addpartner';
import products from './pages/products';
import addproduct_p from './pages/addproduct_p';
import allpartners from './pages/allpartners';
import terms from './pages/terms';
import newuser from './pages/newuser';




function App() {
  const adminUser = {
    email: "irfanferati@gmail.com",
    password: "admin123"
  }

  const [user, setUser] = useState({name: "", email: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);

    if (details.email == adminUser.email && details.password == adminUser.password) {
      console.log("Logged in");
      setUser({
        name: details.name,
        email: details.email
      });
    } else {
      console.log("Details do not match!");
      setError("Details do not match!");
    }

  }

  const Logout = () => {
    setUser({name: "", email: ""});
  }

  return (
    <div className="App">
      {(user.email != "") ? (
             <Router>
          <Sidebar />
          <Switch>
            <Route path="/sales" exact component={sales} />
            <Route path="/reports" exact component={reports} />
            <Route path="/information" exact component={information} />
            <Route path="/newuser" exact component={newuser} />
            <Route path="/terms" exact component={terms} />
            <Route path="/account" exact component={account} />
            <Route path="/settings" exact component={settings} />
            <Route path="/addproduct" exact component={addproduct} />
            <Route path="/addproduct-p" exact component={addproduct_p} />
            <Route path="/addpartner" exact component={addpartner} />
            <Route path="/allpartners" exact component={allpartners} />
            <Route path="/products" exact component={products} />
          </Switch>
      </Router>
    ) : (
      <LoginForm Login={Login} error={error} />
    )
      }
      
    </div>
  );
}

export default App;
