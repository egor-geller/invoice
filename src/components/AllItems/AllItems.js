import React, { useState, useEffect } from "react";
import { read, utils, writeFile } from "xlsx";

const AllItems = (ite) => {
  const [items, setItems] = useState(ite);

  return items;
};

export default AllItems;
