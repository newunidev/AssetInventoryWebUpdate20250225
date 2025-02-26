// import React, { useState, useEffect } from "react";
// import { getCategories } from "../controller/CategoryController"; // Import API call
// import { getItemsByBranchCategory,getItemScans,getItemCountScans,getItemByItemCode } from "../controller/ItemController";
// import "./InventoryCountReport.css"; // Import styles

// const InventoryCountReport = () => {
//   // State for filters
//   const [branch, setBranch] = useState("");
//   const [scannedDate, setScannedDate] = useState("");
//   const [category, setCategory] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categories, setCategories] = useState([]); // Store categories
//   const [items, setItems] = useState([]); // Store retrieved items

 
//   const [itemScans, setItemScans] = useState([]); // Store scanned item data

//   // Sample branches (you can replace this with dynamic data)
//   const branches = [
//     "Hettipola", "Bakamuna1", "Bakamuna2", "Mathara",
//     "Welioya", "Sample Room", "Piliyandala"
//   ];

//   // 🔹 Fetch categories when component loads
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await getCategories();
//         setCategories(data.categories); // Adjust based on API response
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

  

//   const handleSearchItems = async () => {
//     // Validation check
//     if (!branch || !category) {
//       alert("Please select a branch and category before searching.");
//       return;
//     }
  
//     console.log("Searching for:", { branch, scannedDate, category, searchTerm });
  
//     try {
//       const fetchedItems = await getItemsByBranchCategory(branch, category);
//       console.log("Fetched Items:", fetchedItems);
  
//       if (fetchedItems && fetchedItems.success) {
//         let itemsList = fetchedItems.items;
  
//         // Fetch item scans
//         const fetchedItemCountScans = await getItemCountScans(category, branch, scannedDate);
//         console.log("Fetched Item Count Scans:", fetchedItemCountScans);
  
//         if (fetchedItemCountScans && fetchedItemCountScans.success) {
//           const scannedItemMap = new Map();
  
//           // Store scanned items in a map
//           fetchedItemCountScans.itemCountScans.forEach(scan => {
//             scannedItemMap.set(scan.Item.item_code, scan.Item);
//           });
  
//           // Map over items and set availability based on item_code presence in item scans
//           let updatedItems = itemsList.map(item => ({
//             ...item,
//             availability: scannedItemMap.has(item.item_code) ? "Available" : "Not Available"
//           }));
  
//           // Fetch additional details for items not in itemsList
//           const missingItemPromises = [];
//           scannedItemMap.forEach((scannedItem, itemCode) => {
//             if (!itemsList.some(item => item.item_code === itemCode)) {
//               missingItemPromises.push(
//                 getItemByItemCode(itemCode).then(response => {
//                   if (response && response.success) {
//                     return {
//                       ...response.item, // Extract full item details
//                       availability: "Available",
//                        // Assign branch explicitly
//                     };
//                   }
//                   return null;
//                 })
//               );
//             }
//           });
  
//           // Wait for all missing items to be fetched and add them to the list
//           const missingItems = await Promise.all(missingItemPromises);
//           updatedItems = [...updatedItems, ...missingItems.filter(item => item !== null)];
  
//           setItems(updatedItems);
//         } else {
//           // If no scans found, mark all items as "Not Available"
//           const updatedItems = itemsList.map(item => ({
//             ...item,
//             availability: "Not Available"
//           }));
//           setItems(updatedItems);
//         }
//       } else {
//         setItems([]); // Clear items if no data
//       }
//     } catch (error) {
//       console.error("Error fetching item count or scans:", error);
//     }
//   };
  
  




  

//   return (
//     <div className="inventory-report-container">
//       <h2>Inventory Count Report</h2>

//       {/* Search Panel */}
//       <div className="search-panel">
//         <select value={branch} onChange={(e) => setBranch(e.target.value)}>
//           <option value="">Select Branch</option>
//           {branches.map((b, index) => (
//             <option key={index} value={b}>{b}</option>
//           ))}
//         </select>

//         <input
//           type="date"
//           value={scannedDate}
//           onChange={(e) => setScannedDate(e.target.value)}
//         />

//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="">Select Category</option>
//           {categories.map((c, index) => (
//             <option key={index} value={c.cat_id}>{c.cat_name}</option>
//           ))}
//         </select>

//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         {/* Search Button */}
//         <button className="search-button" onClick={handleSearchItems}>
//           Search
//         </button>
//       </div>

//       <div className="table-container">
//             <table className="inventory-table">
//                 <thead>
//                 <tr>
//                     <th>Item Code</th>
//                     <th>Serial No</th>
//                     <th>Name</th>
//                     <th>Description</th>
//                     <th>Category</th>
//                     <th>Branch</th> {/* ✅ New Branch Column */}
//                     <th>Availability</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {items.length > 0 ? (
//                     items.map((item) => (
//                     <tr
//                         key={item.item_code}
//                         className={item.availability === "Available" ? "available-row" : ""}
//                     >
//                         <td>{item.item_code}</td>
//                         <td>{item.serial_no}</td>
//                         <td>{item.name}</td>
//                         <td>{item.description}</td>
//                         <td>{item.Category ? item.Category.cat_name : "N/A"}</td>
//                         <td>{item.branch || "N/A"}</td> {/* ✅ Display branch */}
//                         <td>{item.availability}</td>
//                     </tr>
//                     ))
//                 ) : (
//                     <tr>
//                     <td colSpan="7" style={{ textAlign: "center" }}>No items found</td>
//                     </tr>
//                 )}
//                 </tbody>
//             </table>
//         </div>



//     </div>
//   );
// };

// export default InventoryCountReport;


// import React, { useState, useEffect } from "react";
// import { getCategories } from "../controller/CategoryController"; // Import API call
// import {
//   getItemsByBranchCategory,
//   getItemScans,
//   getItemCountScans,
//   getItemByItemCode,
// } from "../controller/ItemController";
// import "./InventoryCountReport.css"; // Import styles

// const InventoryCountReport = () => {
//   // State for filters
//   const [branch, setBranch] = useState("");
//   const [scannedDate, setScannedDate] = useState("");
//   const [category, setCategory] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [categories, setCategories] = useState([]); // Store categories
//   const [items, setItems] = useState([]); // Store retrieved items

//   // New State for Counts
//   const [factoryMachineCount, setFactoryMachineCount] = useState(0);
//   const [otherFactoryMachineCount, setOtherFactoryMachineCount] = useState(0);

//   // Sample branches
//   const branches = [
//     "Hettipola",
//     "Bakamuna1",
//     "Bakamuna2",
//     "Mathara",
//     "Welioya",
//     "Sample Room",
//     "Piliyandala",
//   ];

//   // 🔹 Fetch categories when component loads
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await getCategories();
//         setCategories(data.categories);
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleSearchItems = async () => {
//     if (!branch || !category) {
//       alert("Please select a branch and category before searching.");
//       return;
//     }

//     try {
//       const fetchedItems = await getItemsByBranchCategory(branch, category);

//       if (fetchedItems && fetchedItems.success) {
//         let itemsList = fetchedItems.items;

//         const fetchedItemCountScans = await getItemCountScans(
//           category,
//           branch,
//           scannedDate
//         );

//         if (fetchedItemCountScans && fetchedItemCountScans.success) {
//           const scannedItemMap = new Map();
//           fetchedItemCountScans.itemCountScans.forEach((scan) => {
//             scannedItemMap.set(scan.Item.item_code, scan.Item);
//           });

//           let updatedItems = itemsList.map((item) => ({
//             ...item,
//             availability: scannedItemMap.has(item.item_code)
//               ? "Available"
//               : "Not Available",
//           }));

//           const missingItemPromises = [];
//           scannedItemMap.forEach((scannedItem, itemCode) => {
//             if (!itemsList.some((item) => item.item_code === itemCode)) {
//               missingItemPromises.push(
//                 getItemByItemCode(itemCode).then((response) => {
//                   if (response && response.success) {
//                     return {
//                       ...response.item,
//                       availability: "Available",
//                     };
//                   }
//                   return null;
//                 })
//               );
//             }
//           });

//           const missingItems = await Promise.all(missingItemPromises);
//           updatedItems = [
//             ...updatedItems,
//             ...missingItems.filter((item) => item !== null),
//           ];

//           setItems(updatedItems);

//           // 🔹 Count Factory and Other Factory Machines
//           const factoryCount = updatedItems.filter(
//             (item) => item.availability === "Available" && item.branch === branch
//           ).length;

//           const otherFactoryCount = updatedItems.filter(
//             (item) => item.availability === "Available" && item.branch !== branch
//           ).length;

//           setFactoryMachineCount(factoryCount);
//           setOtherFactoryMachineCount(otherFactoryCount);
//         } else {
//           const updatedItems = itemsList.map((item) => ({
//             ...item,
//             availability: "Not Available",
//           }));
//           setItems(updatedItems);
//           setFactoryMachineCount(0);
//           setOtherFactoryMachineCount(0);
//         }
//       } else {
//         setItems([]);
//         setFactoryMachineCount(0);
//         setOtherFactoryMachineCount(0);
//       }
//     } catch (error) {
//       console.error("Error fetching item count or scans:", error);
//     }
//   };

//   return (
//     <div className="inventory-report-container">
//       <h2>Inventory Count Report</h2>

//       {/* Search Panel */}
//       <div className="search-panel">
//         <select value={branch} onChange={(e) => setBranch(e.target.value)}>
//           <option value="">Select Branch</option>
//           {branches.map((b, index) => (
//             <option key={index} value={b}>
//               {b}
//             </option>
//           ))}
//         </select>

//         <input
//           type="date"
//           value={scannedDate}
//           onChange={(e) => setScannedDate(e.target.value)}
//         />

//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="">Select Category</option>
//           {categories.map((c, index) => (
//             <option key={index} value={c.cat_id}>
//               {c.cat_name}
//             </option>
//           ))}
//         </select>

//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         {/* Search Button */}
//         <button className="search-button" onClick={handleSearchItems}>
//           Search
//         </button>
//       </div>

//       {/* 🔹 Cards for Factory Machine Count & Other Factory Machine Count */}
//       <div className="count-cards">
//         <div className="count-card factory-machine">
//           <h3>Factory Machine Count</h3>
//           <p>{factoryMachineCount}</p>
//         </div>

//         <div className="count-card other-factory-machine">
//           <h3>Other Factory Machine Count</h3>
//           <p>{otherFactoryMachineCount}</p>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="table-container">
//         <table className="inventory-table">
//           <thead>
//             <tr>
//               <th>Item Code</th>
//               <th>Serial No</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Category</th>
//               <th>Branch</th>
//               <th>Availability</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.length > 0 ? (
//               items.map((item) => (
//                 <tr
//                   key={item.item_code}
//                   className={
//                     item.availability === "Available" ? "available-row" : ""
//                   }
//                 >
//                   <td>{item.item_code}</td>
//                   <td>{item.serial_no}</td>
//                   <td>{item.name}</td>
//                   <td>{item.description}</td>
//                   <td>{item.Category ? item.Category.cat_name : "N/A"}</td>
//                   <td>{item.branch || "N/A"}</td>
//                   <td>{item.availability}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" style={{ textAlign: "center" }}>
//                   No items found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default InventoryCountReport;

import React, { useState, useEffect } from "react";
import { getCategories } from "../controller/CategoryController";
import {
  getItemsByBranchCategory,
  getItemScans,
  getItemCountScans,
  getItemByItemCode,
} from "../controller/ItemController";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./InventoryCountReport.css";

const InventoryCountReport = () => {
  const [branch, setBranch] = useState("");
  const [scannedDate, setScannedDate] = useState("");
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [factoryMachineCount, setFactoryMachineCount] = useState(0);
  const [otherFactoryMachineCount, setOtherFactoryMachineCount] = useState(0);

  const branches = [
    "Hettipola",
    "Bakamuna1",
    "Bakamuna2",
    "Mathara",
    "Welioya",
    "Sample Room",
    "Piliyandala",
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchItems = async () => {
    if (!branch || !category) {
      alert("Please select a branch and category before searching.");
      return;
    }

    try {
      const fetchedItems = await getItemsByBranchCategory(branch, category);
      if (fetchedItems && fetchedItems.success) {
        let itemsList = fetchedItems.items;
        const fetchedItemCountScans = await getItemCountScans(
          category,
          branch,
          scannedDate
        );

        if (fetchedItemCountScans && fetchedItemCountScans.success) {
          const scannedItemMap = new Map();
          fetchedItemCountScans.itemCountScans.forEach((scan) => {
            scannedItemMap.set(scan.Item.item_code, scan.Item);
          });

          let updatedItems = itemsList.map((item) => ({
            ...item,
            availability: scannedItemMap.has(item.item_code)
              ? "Available"
              : "Not Available",
          }));

          const missingItemPromises = [];
          scannedItemMap.forEach((scannedItem, itemCode) => {
            if (!itemsList.some((item) => item.item_code === itemCode)) {
              missingItemPromises.push(
                getItemByItemCode(itemCode).then((response) => {
                  if (response && response.success) {
                    return {
                      ...response.item,
                      availability: "Available",
                    };
                  }
                  return null;
                })
              );
            }
          });

          const missingItems = await Promise.all(missingItemPromises);
          updatedItems = [
            ...updatedItems,
            ...missingItems.filter((item) => item !== null),
          ];

          setItems(updatedItems);

          const factoryCount = updatedItems.filter(
            (item) => item.availability === "Available" && item.branch === branch
          ).length;
          const otherFactoryCount = updatedItems.filter(
            (item) => item.availability === "Available" && item.branch !== branch
          ).length;

          setFactoryMachineCount(factoryCount);
          setOtherFactoryMachineCount(otherFactoryCount);
        } else {
          const updatedItems = itemsList.map((item) => ({
            ...item,
            availability: "Not Available",
          }));
          setItems(updatedItems);
          setFactoryMachineCount(0);
          setOtherFactoryMachineCount(0);
        }
      } else {
        setItems([]);
        setFactoryMachineCount(0);
        setOtherFactoryMachineCount(0);
      }
    } catch (error) {
      console.error("Error fetching item count or scans:", error);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Inventory Count Report", 14, 15);
    doc.setFontSize(12);
    doc.text(`Branch: ${branch || "N/A"}`, 14, 25);
    doc.text(`Scanned Date: ${scannedDate || "N/A"}`, 14, 32);
    doc.text(`Category: ${category || "N/A"}`, 14, 39);

    doc.setFontSize(14);
    doc.text(`Factory Machine Count: ${factoryMachineCount}`, 14, 50);
    doc.text(`Other Factory Machine Count: ${otherFactoryMachineCount}`, 14, 57);

    doc.autoTable({
      startY: 65,
      head: [["Item Code", "Serial No", "Name", "Description", "Branch", "Availability"]],
      body: items.map((item) => [
        item.item_code,
        item.serial_no,
        item.name,
        item.description,
        item.branch || "N/A",
        item.availability,
      ]),
      theme: "striped",
    });

    doc.save("Inventory_Count_Report.pdf");
  };

  return (
    <div className="inventory-report-container">
      <h2 className="report-heading">📊 Current Machine Report</h2>

      <div className="search-panel">
        <select value={branch} onChange={(e) => setBranch(e.target.value)}>
          <option value="">Select Branch</option>
          {branches.map((b, index) => (
            <option key={index} value={b}>
              {b}
            </option>
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
            <option key={index} value={c.cat_id}>
              {c.cat_name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className="search-button" onClick={handleSearchItems}>
          Search
        </button>

        <button className="download-btn" onClick={downloadPDF}>
          PDF
        </button>

        
      </div>
      
      <div className="count-cards">
        
        <div className="count-card factory-machine">
          <h3>Factory Machine Count</h3>
          <p>{factoryMachineCount}</p>
        </div>

        <div className="count-card other-factory-machine">
          <h3>Other Factory Machine Count</h3>
          <p>{otherFactoryMachineCount}</p>
        </div>
      </div>

      

      <div className="table-container">
      
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Serial No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Branch</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr
                  key={item.item_code}
                  className={item.availability === "Available" ? "available" : ""}
                >
                  <td>{item.item_code}</td>
                  <td>{item.serial_no}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.branch || "N/A"}</td>
                  <td>{item.availability}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No items found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryCountReport;
