import { memo } from "react";

const RRPPropsChangedComponent = ({ isActive, txt }) => {
  return <h4>changed</h4>;
};
export default memo(RRPPropsChangedComponent, (prev, next) => {
  if (prev.isActive != next.isActive) {
    return false; // rerender
  } else {
    return true; // don't rerender
  }
});
