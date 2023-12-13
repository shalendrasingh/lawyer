import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
// import { useEffect, useState } from "react";
// import { Droppable, DroppableProps } from "react-beautiful-dnd";

// export const StrictModeDroppable = ({ children, ...props }) => {
//   const [enabled, setEnabled] = useState(false);

//   useEffect(() => {
//     const animation = requestAnimationFrame(() => setEnabled(true));

//     return () => {
//       cancelAnimationFrame(animation);
//       setEnabled(false);
//     };
//   }, []);

//   if (!enabled) {
//     return null;
//   }

//   return <Droppable {...props}>{children}</Droppable>;
// };
