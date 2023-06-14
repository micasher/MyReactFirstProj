import { Navigate, Route, Routes } from "react-router-dom";
// import Pages//
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";
import AboutPage from "../pages/AboutPage";
import FavCardPage from "../pages/FavCardPage";
import EditCardPage from "../pages/EditCardPage";
import ProfilePage from "../pages/ProfilePage";
import CardDataPage from "../pages/CardDataPage";
import NestedRoutePage from "../pages/NestedRoutePage/NestedRoutePage";
import NestedPage1 from "../pages/NestedRoutePage/NestedPage1";
import NestedPage2 from "../pages/NestedRoutePage/NestedPage2";
import RP1 from "../pages/RP1";
import RP2 from "../pages/RP2";
import ReRenderPage from "../pages/ReRenderPage/ReRenderPage";
import ProtectedRoute from "../components/ProtectedRoute";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import CreateCardPage from "../pages/CreateCardPage";
import MyCardsPage from "../pages/MyCards";
import UsersTable from "../pages/CRMPage";
import SandboxPage from "../pages/SandBoxPage";
import ProfileDataPage from "../pages/ProfileDataPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route
        path={ROUTES.FAV}
        element={<ProtectedRoute element={<FavCardPage />} />}
      />
      <Route path={"/cardData/:id"} element={<CardDataPage />} />
      <Route
        path={ROUTES.LOGOUT}
        element={<ProtectedRoute element={<LogoutPage />} />}
      />
      <Route
        path="/edit/:id"
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true}
            element={<EditCardPage />}
          />
        }
      />

      <Route
        path={ROUTES.PROFILE}
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
      <Route
        path={ROUTES.CREATE}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true}
            element={<CreateCardPage />}
          />
        }
      />
      <Route
        path={ROUTES.MYCARD}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={true}
            element={<MyCardsPage />}
          />
        }
      />
      <Route
        path={ROUTES.CRM}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            element={<UsersTable />}
          />
        }
      />
      <Route
        path={ROUTES.PROFILECRM + "/:id"}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            element={<ProfileDataPage />}
          />
        }
      />
      <Route
        path={ROUTES.SANDBOX}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            element={<SandboxPage />}
          />
        }
      >
        <Route path="nr" element={<NestedRoutePage />}>
          <Route path="nestedpage1" element={<NestedPage1 />} />
          <Route path="nestedpage2" element={<NestedPage2 />} />
        </Route>
        <Route path="rerender" element={<ReRenderPage />} />
        <Route path="redux1" element={<RP1 />} />
        <Route path="redux2" element={<RP2 />} />
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
