import React, { useState } from "react";
import { read, utils, writeFile } from "xlsx";
import AllItems from "../AllItems/AllItems";

const ExportItems = () => {
  const [items, setItems] = useState([]);

  const handleExport = () => {
    const headings = [["ItemDescription", "Measurement", "PriceForOne"]];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, items, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Report");
    writeFile(wb, "Items Report.xlsx");
  };

  return (
    <div className="custom-file">
      <input
        type="file"
        name="file"
        className="custom-file-input"
        id="inputGroupFile"
        required
        onChange={AllItems}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      <label className="custom-file-label" htmlFor="inputGroupFile">
        Choose file
      </label>
    </div>
  );
};

export default ExportItems;
