import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import AdminHome from "./Components/Admin/AdminHome/AdminHome";
import PrivateRoute from "./Components/Login/PrivateRoute";
import AddMedicine from "./Components/Admin/AddMedicine/AddMedicine";
import ManageMedicine from "./Components/Admin/ManageMedicine/ManageMedicine";
import SearchResult from "./Components/Admin/SearchResult/SearchResult";
import EditMedicine from "./Components/Admin/EditMedicine/EditMedicine";
import AddMember from "./Components/Admin/AddMember/AddMember";
import SellerHome from "./Components/Seller/SellerHome/SellerHome";
import ManageMember from "./Components/Admin/ManageMember/ManageMember";
import EditUser from "./Components/Admin/EditUser/EditUser";
import SearchUser from "./Components/Admin/SearchUser/SearchUser";
import Report from "./Components/Admin/Report/Report";
import SellMedicine from "./Components/Seller/SellMedicine/SellMedicine";
import Voucher from "./Components/Seller/Voucher/Voucher";
import EditProfile from "./Components/Seller/EditProfile/EditProfile";

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
