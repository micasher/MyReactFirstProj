import { memo } from "react";

const RRPButton2Parcial = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};
export default memo(RRPButton2Parcial, (prevProps, nextProps) => true);
