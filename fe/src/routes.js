
// import Dashboard from "views/Dashboard.js";
// import UserProfile from "views/UserProfile.js";
import Dashboard from "./pages/home/Dashboard";
import UserProfile from "./pages/profile/UserProfile";
import UserPage from "./pages/user/UserPage";
import DepartmentPage from "./pages/department/DepartmentPage";
import ProviderPage from "./pages/provider/ProviderPage";
import DevicePage from "./pages/device/DevicePage";
import AccessoryPage from "pages/accessory/AccessoryPage";
import ReportPage from "pages/report/ReportPage";
import { Error403 } from "pages/auth/error-403";

const dashboardRoutes = [

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
    role: [1, 2],
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
