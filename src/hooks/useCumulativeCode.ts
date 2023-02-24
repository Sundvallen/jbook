import { useSelector } from "../store/hooks";

export const useCumulativeCode = (cellId: string) => {
  return useSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
  import _React from 'react';
  import _ReactDOM from 'react-dom/client';

  var show = (value) => {
    const root = document.querySelector('#root');
    if (typeof value === 'object') {
      if (value.$$typeof && value.props) {
        _ReactDOM.createRoot(root).render(value);
      } else {
        root.innerHTML = JSON.stringify(value);
      }
    }
    else {
      root.innerHTML = value;
    }
  }
  `;

    const showFuncNoOp = "var show = () => {}";

    const cumulativeCode = [];

    for (let cell of orderedCells) {
      // Add all the bundles into an array
      if (cell.type === "code") {
        if (cell.id === cellId) {
          // inject show function into the current cell
          cumulativeCode.push(showFunc);
        } else {
          // In other cells, show is a no-op
          // This is to prevent the function from being called in other cells
          cumulativeCode.push(showFuncNoOp);
        }
        cumulativeCode.push(cell.content);
      }
      // Break the loop when at current cell
      if (cell.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
    // returns the array of code, but join them into a string
  }).join("\n");
};
