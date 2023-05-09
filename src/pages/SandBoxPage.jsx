import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import ExtensionIcon from "@mui/icons-material/Extension";

const SandboxPage = () => {
  return (
    <Fragment>
      <h1>
        SANDBOX <ExtensionIcon />
      </h1>
      <Link to="/sandbox/nr">Nested Route Page</Link> |
      <Link to="/sandbox/rerender">Rerender Pages</Link> |
      <Link to="/sandbox/redux1">Redux Page 1</Link> |
      <Link to="/sandbox/redux2">Redux Page 2</Link>
      <br />
      <Outlet backgroundColor="red" />
    </Fragment>
  );
};
export default SandboxPage;
