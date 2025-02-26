import React, { useState, useEffect } from "react";
import { getCategories } from "../controller/CategoryController"; // Import API call
import { getItemsByBranchCategory,getItemScans } from "../controller/ItemController";
import "./InventoryReport.css"; // Import styles

const InventoryReport = () => {
  // State for filters
  const [branch, setBranch] = useState("");
  const [scannedDate, setScannedDate] = useState("");
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]); // Store categories
  const [items, setItems] = useState([]); // Store retrieved items

 
  const [itemScans, setItemScans] = useState([]); // Store scanned item data

  // Sample branches (you can replace this with dynamic data)
  const branches = [
    "Hettipola", "Bakamuna1", "Bakamuna2", "Mathara",
    "Welioya", "Sample Room", "Piliyandala"
  ];

  // 🔹 Fetch categories when component loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories); // Adjust based on API response
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // 🔹 Handle Search and Fetch Items
//   const handleSearchItems = async () => {
//     console.log("Searching for:", { branch, scannedDate, category, searchTerm });

//     try {
//         const fetchedItems = await getItemsByBranchCategory(branch, category);
//         console.log("Fetched Items:", fetchedItems);

//         if (fetchedItems && fetchedItems.success) {
//             const itemsList = fetchedItems.items;

//             // Fetch item scans
//             const fetchedItemScans = await getItemScans(branch, category, scannedDate);
//             console.log("Fetched Item Scans:", fetchedItemScans);

//             if (fetchedItemScans && fetchedItemScans.success) {
//                 // Extract item_code correctly from item scans
//                 const scannedItemCodes = new Set(
//                     fetchedItemScans.itemScans.map(scan => scan.Item?.item_code?.trim().toLowerCase())
//                 );

//                 console.log("Scanned Item Codes:", scannedItemCodes);

//                 // Map over items and set availability based on item_code presence in item scans
//                 const updatedItems = itemsList.map(item => ({
//                     ...item,
//                     availability: scannedItemCodes.has(item.item_code.trim().toLowerCase()) ? "Available" : "Not Available"
//                 }));

//                 setItems(updatedItems);
//             } else {
//                 // If no scans found, mark all items as "Not Available"
//                 const updatedItems = itemsList.map(item => ({
//                     ...item,
//                     availability: "Not Available"
//                 }));
//                 setItems(updatedItems);
//             }
//         } else {
//             setItems([]); // Clear items if no data
//         }
//     } catch (error) {
//         console.error("Error fetching items or scans:", error);
//     }
// };

const handleSearchItems = async () => {
  // Validation check
  if (!branch || !category) {
      alert("Please select a branch and category before searching.");
      return;
  }

  console.log("Searching for:", { branch, scannedDate, category, searchTerm });

  try {
      const fetchedItems = await getItemsByBranchCategory(branch, category);
      console.log("Fetched Items:", fetchedItems);

      if (fetchedItems && fetchedItems.success) {
          const itemsList = fetchedItems.items;

          // Fetch item scans
          const fetchedItemScans = await getItemScans(branch, category, scannedDate);
          console.log("Fetched Item Scans:", fetchedItemScans);

          if (fetchedItemScans && fetchedItemScans.success) {
              const scannedItemCodes = new Set(fetchedItemScans.itemScans.map(scan => scan.Item.item_code));

              // Map over items and set availability based on item_code presence in item scans
              const updatedItems = itemsList.map(item => ({
                  ...item,
                  availability: scannedItemCodes.has(item.item_code) ? "Available" : "Not Available"
              }));

              setItems(updatedItems);
          } else {
              // If no scans found, mark all items as "Not Available"
              const updatedItems = itemsList.map(item => ({
                  ...item,
                  availability: "Not Available"
              }));
              setItems(updatedItems);
          }
      } else {
          setItems([]); // Clear items if no data
      }
  } catch (error) {
      console.error("Error fetching items or scans:", error);
  }
};




  

  return (
    <div className="inventory-report-container">
      <h2>Inventory Report</h2>

      {/* Search Panel */}
      <div className="search-panel">
        <select value={branch} onChange={(e) => setBranch(e.target.value)}>
          <option value="">Select Branch</option>
          {branches.map((b, index) => (
            <option key={index} value={b}>{b}</option>
          ))}
        </select>

        <input
          type="date"
          value={scannedDate}
          onChange={(e) => setScannedDate(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((c, index) => (
            <option key={index} value={c.cat_id}>{c.cat_name}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Search Button */}
        <button className="search-button" onClick={handleSearchItems}>
          Search
        </button>
      </div>

      <div className="table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Serial No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr
                  key={item.item_code}
                  className={item.availability === "Available" ? "available-row" : ""}
                >
                  <td>{item.item_code}</td>
                  <td>{item.serial_no}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.Category ? item.Category.cat_name : "N/A"}</td>
                  <td>{item.availability}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default InventoryReport;
