import { useEffect } from "react";

let intervalId;

const NestedPage1 = () => {
  useEffect(() => {
    intervalId = setInterval(() => {
      console.log("yes");
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return <h2>Nested page 1</h2>;
};
export default NestedPage1;
