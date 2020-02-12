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
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";

class Dashboard extends Component {
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Report"
                statsIcon="fa fa-history"
                content={
                  <div>
                    <h3>Data hari ini</h3>
                    <table className="table">
                      <tr>
                        <td>Mobil yang paling banyak dijual</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Penjualan hari ini</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Total Penjualan hari ini</td>
                        <td>0</td>
                      </tr>
                    </table>

                    <h3>Data 7 hari terakhir</h3>
                    <table className="table">
                      <tr>
                        <td>Mobil yang paling banyak dijual</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Penjualan hari ini</td>
                        <td>0</td>
                      </tr>
                      <tr>
                        <td>Total Penjualan hari ini</td>
                        <td>0</td>
                      </tr>
                    </table>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
