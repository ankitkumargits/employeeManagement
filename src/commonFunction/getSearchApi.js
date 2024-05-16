export async function getSearchApi(url, formData) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData)
        });
        // if (!response.ok) {
        // throw new Error('Network response was not ok');
        // }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Error fetching data: ' + error.message);
        }
    }