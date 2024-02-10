import { getToken } from "./cookies";

const urlBase = import.meta.env.VITE_API_URL

export async function Api(url ,method = "GET" , data){
    console.log("Fetch a " + urlBase + url);
	console.log(data);
	const response = await fetch(urlBase + url, {
		method: method, 
        headers: {
            'Content-Type': 'application/json', // especifica el tipo de contenido
            'Authorization': `Bearer ${getToken()}` // agrega el token al encabezado 'Authorization'
        },
		body: data ? JSON.stringify(data) : null 
	  });
		if (!response.ok) {
            const errorData = await response.json(); // obtiene los datos del error
            console.error(errorData.error);
			throw new Error(`HTTP error! status: ${response.status}`);
		} else {
			const data = await response.json();
            console.log(data);
		return data;
		}

    }
	