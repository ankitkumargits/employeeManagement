export async function AddApiData(url, formData){
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
            }
        const data = await response.json();
        // console.log(data);
        return data;
    }catch (err){
        throw new Error('Error fetching data: ' + err.message);
    }
    
}