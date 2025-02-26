import apiClient from '../utility/api'; // Import the existing Axios instance

export const getItemsByBranchCategory = async (branch, categoryId) => {
    try {
        const response = await apiClient.get(`/itemsbybranch?branch=${branch}&category_id=${categoryId}`);
        console.log('Items Response:', response.data); // ✅ Log API response
        return response.data; // Return item data
    } catch (error) {
        console.error('Error fetching items:', error.message);
        throw error;
    }
};

export const getItemScans = async (branch, categoryId, scannedDate) => {
    try {
        const response = await apiClient.get(`/itemscansbybranchitemcategory?branch=${branch}&category_id=${categoryId}&scanned_date=${scannedDate}`);
        console.log('Item Scans Response:', response.data); // ✅ Log API response
        return response.data; // Return scanned item data
    } catch (error) {
        console.error('Error fetching item scans:', error.message);
        throw error;
    }
};


//api method for item count
export const getItemCountScans = async(categoryId,currentBranch,scannedDate)=>{
    try{
        const response = await apiClient.get(`itemcountscansbybranchcurrentbranchdatecat?category_id=${categoryId}&scanned_date=${scannedDate}&current_branch=${currentBranch}`);
        console.log('Item Scan count Response:', response.data); // ✅ Log API response
        return response.data; 
    }catch(error){
        console.error('Error fetching item count scans:', error.message);
        throw error;
    }
}

export const getItemByItemCode = async(item_code)=>{
    try{
        const response = await apiClient.get(`itemsbyitemcode?item_code=${item_code}`);
        console.log('Item Scan count Response:', response.data); // ✅ Log API response
        return response.data; 
    }catch(error){
        console.error('Error fetching item count scans:', error.message);
        throw error;
    }
}

export const getTotalItemsbyBranch = async(branch)=>{
    try{
        const response = await apiClient.get(`itemsatotalbybranch?branch=${branch}`);
        console.log('Total Item Count Scan Response:',response.data);
        return response.data;

    }catch(error){
        console.error('Error fetching item count :', error.message);
        throw error;
    }
}

export const getTotalItemsCount = async()=>{
    try{
        const response = await apiClient.get(`noofitems`);
        console.log('Total Item total Count  Response:',response.data);
        return response.data;

    }catch(error){
        console.error('Error fetching total item count :', error.message);
        throw error;
    }
}

export default {
    getItemsByBranchCategory,
    getItemScans,
    getItemByItemCode,
    getTotalItemsbyBranch,
    getTotalItemsCount
};
