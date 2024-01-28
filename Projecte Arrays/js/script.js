//CARGAR LOS DATOS DE LOS JSON EN UNA TABLA POR CONSOLA 

// async function fetchData(url) {
// 	const response = await fetch(url);
// 	if (!response.ok) {
// 		throw new Error(`Error al obtener datos de ${url}`);
// 	}
// 	return response.json();
// }

// function mostrarDades() {
// 	// Realizar la solicitud para obtener los datos de los Pokémon
// 	fetchData("js/data/pokemon.json")
// 		.then((pokemonData) => {
// 			// Realizar la solicitud para obtener los datos de los municipios
// 			return fetchData("js/data/municipis.json").then((municipisData) => {

// 				return fetchData("js/data/movies.json").then((moviesData) => {

// 					// Realizar la solicitud para obtener los datos de los meteoritos
// 					return fetchData("js/data/earthMeteorites.json").then((meteoritesData) => {
// 						const datosCombinados = [];

// 						for (let i = 0; i < Math.min(pokemonData.pokemon.length, municipisData.elements.length, meteoritesData.length, moviesData.length); i++) {
// 							const pokemon = pokemonData.pokemon[i];
// 							const municipio = municipisData.elements[i];
// 							const movies = moviesData[i];
// 							const meteorite = meteoritesData[i];

// 							datosCombinados.push({
// 								Nombre_Pokemon: pokemon.name,
// 								Nombre_Municipio: municipio.municipi_nom,
// 								Movies_Tiltle: movies.title,
// 								Nombre_Meteorite: meteorite.name
// 							});
// 						}
// 						// Mostrar la tabla en la consola
// 						console.table(datosCombinados);
// 					});
// 				});
// 			});
// 		})
// 		.catch((error) => console.error("Error recuperando datos:", error));
// }

async function fetchData(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Error al obtener datos de ${url}`);
	}
	return response.json();
}

function recargarPagina() {
	location.reload();
}

function orderList(order) {
    datosCombinados.sort((a, b) => {
        const valueA = a.Nombre.toLowerCase();
        const valueB = b.Nombre.toLowerCase();
        return order === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
    printList();
}


function searchList() {
    const searchTerm = prompt("Introduce el nombre del Pokemon a buscar:");
    if (searchTerm) {  // Verifica si el usuario ingresó un valor antes de procesar
        const index = datosCombinados.findIndex(item => item.Nombre.toLowerCase() === searchTerm.toLowerCase());
        if (index !== -1) {
            alert(`El Pokemon ${searchTerm} se encuentra en la posición ${index + 1}`);


        } else {
            alert(`El Pokemon ${searchTerm} no fue encontrado`);
        }
    }
}

function calcMedia() {
    const valores = datosCombinados.map(item => parseFloat(item.PESO.replace(' kg', '')));
    const media = valores.reduce((acc, val) => acc + val, 0) / valores.length;
    alert(`La media del peso de los Pokemon es: ${media.toFixed(2)} kg`);
}


const datosCombinados = [];

async function mostrarDades() {
	try {
		const [pokemonData] = await Promise.all([
			fetchData("js/data/pokemon.json")
		]);

		for (let i = 0; i < Math.min(pokemonData.pokemon.length); i++) {
			const pokemon = pokemonData.pokemon[i];

			datosCombinados.push({
				NUM: pokemon.num,
				IMAGEN: pokemon.img,
				Nombre: pokemon.name,
				PESO: pokemon.weight	
			});
			console.log(i);
		}
		// Llamada a printList
		printList();

	} catch (error) {
		console.error("Error recuperando datos:", error);
	}
}

function printList() {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = ''; // Limpiar el contenido anterior

    const table = document.createElement('table');
    table.border = '1';
    table.style.borderCollapse = 'collapse';
	

    // Cabecera de la tabla
    const headerRow = table.insertRow(0);
    for (const key in datosCombinados[0]) {
        const headerCell = document.createElement('th');
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
		
    }

    // Filas de datos
    datosCombinados.forEach((item, index) => {
        const row = table.insertRow(index + 1);
        for (const key in item) {
            const cell = row.insertCell();
            if (key === 'IMAGEN') {
                // Si la clave es 'IMAGEN', crea un elemento img en lugar de asignar el texto directamente
                const img = document.createElement('img');
                img.src = item[key];
                img.alt = item['Nombre']; // Puedes establecer el atributo alt con el nombre del Pokémon
                cell.appendChild(img);
            } else {
                // Para otras claves, simplemente asigna el texto
                cell.textContent = item[key];
            }
        }
    });

    resultadoDiv.appendChild(table);
}






/*
// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	dades = data.elements;		
	
	console.log(dades)
	console.log(dades[0].municipi_nom)
});

/*

// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	dades = data;		
	
	console.log(dades)
	console.log(dades[0].name)
});


// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	dades = data.movies;		
	
	console.log(dades)
	console.log(dades[0].title)
});

*/