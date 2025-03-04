



// export default Machine;
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getMachines } from '../utility/api';
import { getItemCountLastScannedLocation } from '../controller/ItemController';
import { FaSearch, FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Machine.css';

const branches = [
  "All", "Hettipola", "Bakamuna1", "Bakamuna2", "Mathara",
  "Welioya", "Sample Room", "Piliyandala"
];

const Machine = () => {
  const [machines, setMachines] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupSearch, setPopupSearch] = useState("");


  //this is for pop window scan option//

  const [itemDetails, setItemDetails] = useState(null); // Store item details
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  //end for pop up window
  

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const data = await getMachines();
        if (Array.isArray(data)) {
          setMachines(data);
        } else if (data.items && Array.isArray(data.items)) {
          setMachines(data.items);
        } else {
          console.error("Unexpected API response format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch machines:", error);
      }
    };

    fetchMachines();
  }, []);

  const filteredMachines = machines.filter(machine =>
    (selectedBranch === "All" || machine.branch === selectedBranch) &&
    (searchQuery === "" ||
      machine.item_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      machine.serial_no.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Open Popup
  const openPopup = () => {
    setItemDetails(null); // ✅ Clear previous item details
    setError(null); // ✅ Clear previous errors
    setLoading(true); // ✅ Show loading state
    setShowPopup(true);
  };

  // Close Popup
  const closePopup = () => {
    setShowPopup(false);
    setPopupSearch(""); // Reset search query
  };

  // Search Action (Inside Popup)
  const handlePopupSearch = async () => {
    if (!popupSearch.trim()) {
      setError("Please enter an item code");
      return;
    }
  
    setItemDetails(null); // ✅ Clear previous item details
    setError(null); // ✅ Clear previous errors
    setLoading(true); // ✅ Show loading state
  
    try {
      const response = await getItemCountLastScannedLocation(popupSearch);
      
      if (response.success && response.latestItemCount) {
        setItemDetails(response.latestItemCount);
      } else {
        setError("No data found for this item code.");
      }
    } catch (error) {
      setError("Failed to fetch item details.");
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };
  

  return (
    <div className="machine-container">
      <h2 className="report-heading">📊 Machine Details Report</h2>

      {/* Filters: Branch Dropdown & Search Box */}
      <div className="search-panel">
        <div className="field-container">
          <label htmlFor="branchSelect">Select Branch:</label>
          <select
            id="branchSelect"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="All">All</option>
            {branches.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        <div className="field-container">
          <label htmlFor="searchInput">Search Item Code:</label>
          <input
            type="text"
            id="searchInput"
            placeholder="Enter Item Code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button className="checkmachine-btn" onClick={openPopup}>
        📍TRACK 
        </button>

        <button className="download-btn">
          PDF
        </button>
      </div>

      {/* Popup Dialog */}
      {showPopup &&
        ReactDOM.createPortal(
          <div className="popup">
            <div className="popup-content">
              {/* 🔹 Close Button (Top-Right Corner) */}
              <button className="closed-btn" onClick={closePopup}>
                <FaTimes />
              </button>

              {/* 🔹 Popup Title */}
              <h3 className="popup-title">MACHINE TRACKER</h3>

              {/* 🔹 Search Section (Aligned Button & Input) */}
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Enter Item Code..."
                  value={popupSearch}
                  onChange={(e) => setPopupSearch(e.target.value)}
                />
                <button className="search-btn" onClick={handlePopupSearch}>
                  <FaSearch />
                </button>
              </div>

              {/* 🔹 Loading and Error Messages */}
              {loading && <p className="loading">Loading...</p>}
              {error && <p className="error">{error}</p>}

              {/* 🔹 Display Item Details */}
              {itemDetails && (
                <div className="item-details">
                  <h4>Item Details</h4>
                  <p>🔹 <strong>Name:</strong> {itemDetails.Item.name}</p>
                  <p>🔢 <strong>Serial No:</strong> {itemDetails.Item.serial_no}</p>
                  <p>📂 <strong>Category:</strong> {itemDetails.Category.cat_name}</p>
                  <p>📅 <strong>Last Scanned Date:</strong> {itemDetails.scanned_date}</p>
                  <p>🏢 <strong>Last Scanned Branch:</strong> {itemDetails.current_branch}</p>
                  <p>📍 <strong>Owner Branch:</strong> {itemDetails.branch}</p>
                </div>
              )}
            </div>
          </div>,
          document.body
        )
      }
      {/* Machine Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Serial No</th>
              <th>Name</th>
              <th>Description</th>
              <th>Branch</th>
              <th>Model No</th>
              <th>Box No</th>
            </tr>
          </thead>
          <tbody>
            {filteredMachines.length > 0 ? (
              filteredMachines.map((machine) => (
                <tr
                  key={machine.item_code}
                  className={machine.description?.toLowerCase() === "repairing" ? "repairing" : ""}
                >
                  <td>{machine.item_code || "N/A"}</td>
                  <td>{machine.serial_no || "N/A"}</td>
                  <td>{machine.name || "N/A"}</td>
                  <td>{machine.description || "N/A"}</td>
                  <td>{machine.branch || "N/A"}</td>
                  <td>{machine.model_no || "N/A"}</td>
                  <td>{machine.box_no || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No machines found</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Machine;
