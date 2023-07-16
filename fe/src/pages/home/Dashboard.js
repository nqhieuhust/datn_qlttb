import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";

import { TotalDasboardCpn } from "components/dashboard/total";
import { apiDashboard } from "../../api/admin/dasboard";

function Dashboard() {
  const [countNumber, setCountNumber] = useState(null);

  const dispatch = useDispatch();
  console.log(countNumber);

  useEffect(() => {
    apiDashboard.count_total(null, setCountNumber, dispatch);
  }, []);
  return (
    <Container fluid>
      <h2 className="dashboard-style mb-5">
        Chào mừng đến trang Quản lý thiết bị y tế!
      </h2>
      {countNumber && <TotalDasboardCpn countNumber={countNumber} />}
      {/* <LineGraphCpn /> */}
    </Container>
  );
}

export default Dashboard;
