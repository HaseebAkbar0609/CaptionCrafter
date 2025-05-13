const { default: auth } = require("@/config/firebase");

export const getStats=async()=>{
    const token=await auth.currentUser.getIdToken();
    if (!token) {
        throw new Error('User is not authenticated');
    }
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/api/stats/'+auth.currentUser.uid, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        } 
        });
    if (!response.ok) {
        throw new Error('Failed to fetch stats');
    }
    // Check if the response is ok (status code 200-299)
    // If not, throw an error
    const data = await response.json();
    console.log('Stats data:', data);

    return data;

}