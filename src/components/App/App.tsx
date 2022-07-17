import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useCookies } from "react-cookie";
import * as LS from "./App.styles";
import AccountPage from "../../pages/AccountPage/AccountPage";
import LoggedTemplate from "../LoggedTemplate/LoggedTemplate";
import MainPage from "../../pages/MainPage/MainPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import UnitsManagementsPage from "../../pages/UnitsManagementsPage/UnitsManagementsPage";
import UsersPage from "../../pages/UsersPage/UsersPage";
import SchedulePage from "../../pages/SchedulePage/SchedulePage";
import PlanSettingsPage from "../../pages/PlanSettingsPage/PlanSettingsPage";
import logo from "../../images/scheduling-logo.png"; //source: https://www.pngegg.com/pl/png-ntirs
import OrganizationOfStructure from "../../pages/OrganizationOfStructure/OrganizationOfStructure";

function App() {
  const [cookies] = useCookies(["user"]);

  const withLoggedCheck = (page: React.ReactNode) => {
    return cookies["user"] ? (
      <LoggedTemplate mainLogo={logo} childComp={page} />
    ) : (
      <Redirect to="/logowanie" />
    );
  };

  return (
    <LS.FullBody>
      <Router>
        <Switch>
          <Route exact path="/">
            {withLoggedCheck(<MainPage />)}
          </Route>
          <Route exact path="/logowanie">
            {cookies["user"] ? (
              <Redirect to="/" />
            ) : (
              <LoginPage mainLogo={logo} />
            )}
          </Route>
          <Route exact path="/konto">
            {withLoggedCheck(<AccountPage />)}
          </Route>
          <Route exact path="/zarzadzanie-jednostkami-i-strukturami">
            {withLoggedCheck(<UnitsManagementsPage />)}
          </Route>
          <Route exact path="/osoby">
            {withLoggedCheck(<UsersPage />)}
          </Route>
          <Route exact path="/plan-zajec">
            {withLoggedCheck(<SchedulePage />)}
          </Route>
          <Route exact path="/ustalanie-planu">
            {withLoggedCheck(<PlanSettingsPage />)}
          </Route>
          <Route exact path="/organizacja-struktury">
            {withLoggedCheck(<OrganizationOfStructure />)}
          </Route>
        </Switch>
      </Router>
    </LS.FullBody>
  );
}

export default App;
