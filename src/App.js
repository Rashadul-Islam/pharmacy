import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import AdminHome from "./Components/Dashboard/Admin/AdminHome/AdminHome";
import PrivateRoute from "./Components/Login/PrivateRoute";
import AddMedicine from "./Components/Dashboard/Admin/AddMedicine/AddMedicine";
import ManageMedicine from "./Components/Dashboard/Admin/ManageMedicine/ManageMedicine";
import SearchResult from "./Components/Dashboard/Admin/SearchResult/SearchResult";
import EditMedicine from "./Components/Dashboard/Admin/EditMedicine/EditMedicine";
import AddMember from "./Components/Dashboard/Admin/AddMember/AddMember";
import SellerHome from "./Components/Dashboard/Seller/SellerHome/SellerHome";
import ManageMember from "./Components/Dashboard/Admin/ManageMember/ManageMember";
import EditUser from "./Components/Dashboard/Admin/EditUser/EditUser";
import SearchUser from "./Components/Dashboard/Admin/SearchUser/SearchUser";
import Report from "./Components/Dashboard/Admin/Report/Report";
import SellMedicine from "./Components/Dashboard/Seller/SellMedicine/SellMedicine";
import Voucher from "./Components/Dashboard/Seller/Voucher/Voucher";
import EditProfile from "./Components/Dashboard/Seller/EditProfile/EditProfile";

export const UserContext = createContext();
export const UserContext2 = createContext();
export const UserContext3 = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
  const [conTextMedicine, setContextMedicine] = useState({});
  const [conTextTotal, setContextTotal] = useState({});
  let { role } = loggedInUser;
  const Role = role || sessionStorage.getItem('role');
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <UserContext2.Provider value={[conTextMedicine, setContextMedicine]}>
      <UserContext3.Provider value={[conTextTotal, setContextTotal]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            {
              Role === 'Admin' ? (<React.Fragment>
                <PrivateRoute path="/dashboard">
                  <AdminHome></AdminHome>
                </PrivateRoute>
                <PrivateRoute path="/addMedicine">
                  <AddMedicine></AddMedicine>
                </PrivateRoute>
                <PrivateRoute path="/manageMedicine">
                  <ManageMedicine></ManageMedicine>
                </PrivateRoute>
                <PrivateRoute path="/searchResult">
                  <SearchResult></SearchResult>
                </PrivateRoute>
                <PrivateRoute path="/editMedicine">
                  <EditMedicine></EditMedicine>
                </PrivateRoute>
                <PrivateRoute path="/addMember">
                  <AddMember></AddMember>
                </PrivateRoute>
                <PrivateRoute path="/manageMember">
                  <ManageMember></ManageMember>
                </PrivateRoute>
                <PrivateRoute path="/editUser">
                  <EditUser></EditUser>
                </PrivateRoute>
                <PrivateRoute path="/searchUser">
                  <SearchUser></SearchUser>
                </PrivateRoute>
                <PrivateRoute path="/report">
                  <Report></Report>
                </PrivateRoute>
              </React.Fragment>) :
                <React.Fragment>
                  <PrivateRoute path="/dashboard">
                    <SellerHome></SellerHome>
                  </PrivateRoute>
                  <PrivateRoute path="/sellMedicine">
                    <SellMedicine></SellMedicine>
                  </PrivateRoute>
                  <PrivateRoute path="/voucher">
                    <Voucher></Voucher>
                  </PrivateRoute>
                  <PrivateRoute path="/editProfile">
                    <EditProfile></EditProfile>
                  </PrivateRoute>
                </React.Fragment>
            }
            <Route path="*">
              <Home></Home>
            </Route>
          </Switch>
        </Router>
        </UserContext3.Provider>
      </UserContext2.Provider>
    </UserContext.Provider>
  );
}

export default App;
