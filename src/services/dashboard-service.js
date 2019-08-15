import axios from "axios";

class DashboardService {
  constructor() {
    this.dashboard = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN + "/dashboard",
      withCredentials: true
    });
  }

  getMyDashboard() {
    return this.dashboard.get("/").then(response => response);
  }

  getDashboardOfUser(userId) {
    return this.dashboard.get(`/${userId}`).then(response => response);
  }

  editMyUser() {
    return this.dashboard.get("/").then(response => response);
  }
}

const dashboardService = new DashboardService();

export default dashboardService;
