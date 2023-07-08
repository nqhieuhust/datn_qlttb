/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import UserPage from "./pages/user/UserPage";
import DepartmentPage from "./pages/department/DepartmentPage";
import ProviderPage from "./pages/provider/ProviderPage";
import DevicePage from "./pages/device/DevicePage";
import AccessoryPage from "pages/accessory/AccessoryPage";
import ReportPage from "pages/report/ReportPage";
import { Error403 } from "pages/auth/error-403";

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin"
  // },
  {
    path: "/dashboard",
    name: "Trang chủ",
    icon: "nc-icon nc-grid-45",
    component: Dashboard,
    layout: "/admin",
    role: [1, 2, 3],
  },
  {
    path: "/user",
    name: "Người dùng",
    icon: "nc-icon nc-circle-09",
    component: UserPage,
    layout: "/admin",
    role: [1],
  },
  {
    path: "/department",
    name: "Khoa/Phòng",
    icon: "nc-icon nc-bank",
    component: DepartmentPage,
    layout: "/admin",
    role: [1, 2, 3],
  },

  {
    path: "/provider",
    name: "Nhà cung cấp",
    icon: "nc-icon nc-delivery-fast",
    component: ProviderPage,
    layout: "/admin",
    role: [1, 2],
  },
  {
    path: "/device",
    name: "Thiết bị",
    icon: "nc-icon nc-bullet-list-67",
    component: DevicePage,
    layout: "/admin",
    role: [1, 2, 3],
  },
  {
    path: "/accessory",
    name: "Vật tư tiêu hao",
    icon: "nc-icon nc-settings-90",
    component: AccessoryPage,
    layout: "/admin",
    role: [1, 2, 3],
  },

  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Icons,
  //   // component: Notifications,
  //   layout: "/admin"
  // },
  {
    path: "/report",
    name: "Báo cáo, thống kê",
    icon: "nc-icon nc-notes",
    component: ReportPage,
    layout: "/admin",
    role: [2,3]
  },

  {
    path: "/profile",
    name: "Thông tin người dùng",
    icon: "nc-icon nc-air-baloon",
    component: UserProfile,
    layout: "/admin",
    role: [1, 2, 3],
  },

  {
    path: "/error/403",
    name: "Error",
    icon: "nc-icon nc-air-baloon",
    component: Error403,
    layout: "/admin",
    not_show: true,
  },
];

export default dashboardRoutes;
