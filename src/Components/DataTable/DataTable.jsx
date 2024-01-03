import { useBem } from "@/Services/Hooks";

import "./DataTable.scss";
import { useMemo } from "react";

export const DataTable = (props) => {
  const bem = useBem("data-table");

  const appStyles = useMemo(() => {
    return {
      ...props.styles,
      maxHeight: props.maxHeight,
      overflowX: props.scrollX && "scroll",
      overflowY: props.scrollY && "scroll",
    };
  }, [props]);

  return (
    <>
      <div style={appStyles} className="overflow-hidden rounded-lg">
        <table
          className={bem.b()}
          style={{
            maxHeight: props.maxHeight,
          }}
        >
          <thead className={bem.e("thead")}>{props.thead}</thead>

          <tbody className={bem.e("tbody")}>{props.tbody}</tbody>
        </table>
      </div>

      {props.footer}
    </>
  );
};

export default DataTable;
