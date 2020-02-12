/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import Car from "views/Car.jsx";
import Sales from "views/Sales.jsx";
import Setting from "views/Setting.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/cars",
    name: "Data Mobil",
    icon: "pe-7s-car",
    component: Car,
    layout: "/admin"
  },
  {
    path: "/sales",
    name: "Penjualan",
    icon: "pe-7s-cash",
    component: Sales,
    layout: "/admin"
  },
  {
    path: "/setting",
    name: "Pengaturan",
    icon: "pe-7s-settings",
    component: Setting,
    layout: "/admin"
  },
];

export default dashboardRoutes;
