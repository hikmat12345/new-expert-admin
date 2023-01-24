// libs
import React,{useContext} from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { FAEGuardedRoute } from "@findanexpert-fae/components/dist/stories/FAEGuardedRoute/FAEGuardedRoute";

// src
import AccountBalanceListing from "./Pages/AccountBalanceListing/AccountBalanceListing";
import AccountBalanceSetting from "./Pages/AccountBalanceSetting";
import CreateOrEditAudience from "./Pages/CreateOrEditAudience";
import CreateOrEditVoucher from "./Pages/CreateOrEditVoucher";
import Login from "./Pages/Login";
import Setting from "./Pages/Setting";
import VoucherListing from "./Pages/VoucherListing";
import PushNotification from "./Pages/PushNotification";
import RolesListing from './Pages/RolesListing'
import AssignPermission from "./Pages/AssignPermission";
import AssignUser from "./Pages/AsignUserRole";
import Industries from "./Pages/Industries";
import Services from "./Pages/Services";
import Bookings from "./Pages/Bookings";
import AdminUsers from "./Pages/AdminUsers";
import BookingCalendar from "./Pages/BookingCalendar";
import { UserContext } from "./Contexts/userContext";
import Customers from "./Pages/Customers";
import ServiceProvider from "./Pages/ServiceProvider";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/NotFound/NotFound";
import AssignVoucher from "./Pages/AssignVoucher";
import AddUserRole from "./Pages/AddUserRole";
import DiscountCodeListing from "./Pages/DiscountCodeListing/DiscountCodeListing";
import AddDiscountCode from "./Pages/AddDiscountCode";
import UserRoleList from "./Pages/UserRoleList";
import AssignedUsers from "./Pages/AssignedUsers";
import RolePermissions from "./Pages/RolePermissions";
import AddUser from "./Pages/AddUser";
import UserListing from "./Pages/UserListing";

const Routes = () => {
  const[userId]=useContext(UserContext);
  return (
    <Switch>

      <FAEGuardedRoute
        path="/"
        component={Dashboard}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/vouchers"
        component={VoucherListing}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
          <FAEGuardedRoute
        path="/customers"
        component={Customers}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/add"
        component={CreateOrEditVoucher}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/update"
        component={CreateOrEditVoucher}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />

        <FAEGuardedRoute
        path="/voucher-assign"
        component={AssignVoucher}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/setting"
        component={Setting}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/balances"
        component={AccountBalanceListing}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/add-balance"
        component={AccountBalanceSetting}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/update-balance"
        component={AccountBalanceSetting}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/audience"
        component={CreateOrEditAudience}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/push-notification"
        component={PushNotification}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />

      {/********************** User Role related routes *********************************/}

      <FAEGuardedRoute
        path="/role-listing"
        component={RolesListing}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/assign-permission"
        component={AssignPermission}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/add-role"
        component={AddUserRole}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />

      <FAEGuardedRoute
        path="/user-role"
        component={UserRoleList}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />

      <FAEGuardedRoute
        path="/role-permission"
        component={RolePermissions}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />

      <FAEGuardedRoute
        path="/assigned-users"
        component={AssignedUsers}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/users"
        component={UserListing}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />

      <FAEGuardedRoute
        path="/add-user"
        component={AddUser}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/industries"
        component={Industries}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/services"
        component={Services}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />

      <FAEGuardedRoute
        path="/service-provider"
        component={ServiceProvider}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />

      <FAEGuardedRoute
        path="/bookings"
        component={Bookings}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/booking-calendar"
        component={BookingCalendar}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/admin-users"
        component={AdminUsers}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />

{/********************** Discount code related routes *********************************/}

       <FAEGuardedRoute
        path="/discount-codes"
        component={DiscountCodeListing}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
       <FAEGuardedRoute
        path="/add-discount"
        component={AddDiscountCode}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />

      <FAEGuardedRoute
        path="/update-discount"
        component={AddDiscountCode}
        exact
        auth={localStorage.getItem("isLogin") === "true" ? true : false}
      />
      <FAEGuardedRoute
        path="/login"
        component={Login}
        exact
        auth={localStorage.getItem("isLogin") === "true" & userId!=null ? false : true}
      />
       <Route path="/not-found" component={NotFound} />
       <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
