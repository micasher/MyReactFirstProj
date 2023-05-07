/* import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import NestedRoutePage from "./NestedRoutePage";
import RP1 from "./RP1";
import RP2 from "./RP2";
import UseMemoPage from "./UseMemoPage";
import ReRenderPage from "./ReRenderPage/ReRenderPage";

const SandBoxPage = () => {
  return (
    <Box>
      <Typography variant="h2" color="primary" align="center">
        Sand Box
      </Typography>
      <Divider></Divider>
      <br />
      <NestedRoutePage />
      ||
      <RP1 />
      ||
      <UseMemoPage />
      <ReRenderPage />
    </Box>
  );
};
export default SandBoxPage;
 */

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
