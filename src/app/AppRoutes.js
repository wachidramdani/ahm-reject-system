import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));

const MonitoringRS = lazy(() => import("./monitoring/MonitoringRs"));

const Signin = lazy(() => import("./general-pages/Signin"));
const NotFound = lazy(() => import("./general-pages/NotFound"));

const Buttons = lazy(() => import("./ui-elements/Buttons"));
const Dropdowns = lazy(() => import("./ui-elements/Dropdowns"));
const Icons = lazy(() => import("./ui-elements/Icons"));

const FormElements = lazy(() => import("./form/FormElements"));

const ChartJs = lazy(() => import("./charts/ChartJs"));

const BasicTable = lazy(() => import("./tables/BasicTable"));

//---transaction
const CreateRc = lazy(() => import("./transaction/RejectCard"));
const PrintRc = lazy(() => import("./transaction/PrintRejectCard"));
const PrintSj = lazy(() => import("./transaction/PrintSuratJalan"));
const GivePartReject = lazy(() => import("./transaction/GivePartReject"));
const ReceivePartReplacement = lazy(() => import("./transaction/ReceivePartReplacement"));

//---mia

const Submission = lazy(() => import("./mia/Submission"));
const Clustering = lazy(() => import("./mia/Clustering"));
const Reviewing = lazy(() => import("./mia/Reviewing"));
const Judging = lazy(() => import("./mia/Judging"));
const Award = lazy(() => import("./mia/Award"));
const DashboardMia = lazy(() => import("./mia/Dashboard"));

//--master
const Inspection = lazy(() => import("./master/Inspection"));
const Sympstomps = lazy(() => import("./master/Sympstomps"));
const PartNumber = lazy(() => import("./master/PartNumber"));

// function RequireAuth({ children }) {
//   const check_token = localStorage.getItem('cekToken')
//   const location = useLocation();

//   return check_token === 'true' ? children : <Redirect to="/general-pages/signin" replace state={{ path: location.pathname }} />;
// }

// function CheckAuth({ children }) {
//   const check_token = localStorage.getItem('cekToken')
//   const location = useLocation();
//   console.log(check_token, 'cc')

//   return check_token === 'true' ? <Redirect to="/" replace state={{ path: location.pathname }} /> : children;
// }

export class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback="">
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard"></Redirect>
          </Route>
          <Route exact path="/dashboard" component={Dashboard} />

          <Route exact path="/monitoring-rs" component={MonitoringRS} />

          <Route exact path="/general-pages/signin" component={Signin} />
          {/* <Route exact path='/general-pages/signin' element={<CheckAuth><Signin/></CheckAuth>} /> */}
          <Route exact path="/general-pages/notfound" component={NotFound} />

          <Route exact path="/ui-elements/buttons" component={Buttons} />
          <Route exact path="/ui-elements/dropdowns" component={Dropdowns} />
          <Route exact path="/ui-elements/icons" component={Icons} />

          <Route exact path="/form/form-elements" component={FormElements} />

          <Route exact path="/charts/chartjs" component={ChartJs} />

          <Route exact path="/tables/basic-table" component={BasicTable} />

          {/* transaction */}
          <Route exact path="/transaction/createrc" component={CreateRc} />
          <Route exact path="/transaction/printrc" component={PrintRc} />
          <Route exact path="/transaction/printsj" component={PrintSj} />
          <Route exact path="/transaction/givepart" component={GivePartReject} />
          <Route exact path="/transaction/receivepart" component={ReceivePartReplacement} />

          {/* mia */}
          <Route exact path="/mia/submission" component={Submission} />
          <Route exact path="/mia/clustering" component={Clustering} />
          <Route exact path="/mia/reviewing" component={Reviewing} />
          <Route exact path="/mia/judging" component={Judging} />
          <Route exact path="/mia/award" component={Award} />
          <Route exact path="/mia/dashboard" component={DashboardMia} />

          {/* master */}
          <Route exact path="/master/inspection" component={Inspection} />
          <Route exact path="/master/sympstomps" component={Sympstomps} />
          <Route exact path="/master/part-number" component={PartNumber} />

          <Redirect from="*" to="/general-pages/notfound" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
