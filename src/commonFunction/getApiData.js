// api.js

export async function fetchApi(url) {
    try {
        const response = await fetch(url);
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
    