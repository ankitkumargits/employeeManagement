export async function deleteApi(url) {
    try {
        const response = await fetch(url, {
            method: "DELETE",
        });
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        throw new Error('Error fetching data: ' + error.message);
        }
    }