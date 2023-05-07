import { memo } from "react";

const RRPButtonParcial = () => {
  return <button>this button should not be change</button>;
};

export default memo(RRPButtonParcial, (a, b) => true);
