
// POKEMONS

let dades;


// POKEMONS
async function fetchData(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Error fetching data from ${url}`);
	}
	return response.json();
}

function mostrarDades() {
	// Realizar la solicitud para obtener los datos de los Pokémon
	fetchData("js/data/pokemon.json")
		.then((pokemonData) => {
			// Realizar la solicitud para obtener los datos de los municipios
			return fetchData("js/data/municipis.json").then((municipisData) => {
				// Realizar la solicitud para obtener los datos de los meteoritos
				return fetchData("js/data/earthMeteorites.json").then((meteoritesData) => {
					const datosCombinados = [];

					for (let i = 0; i < Math.min(pokemonData.pokemon.length, municipisData.elements.length, meteoritesData.length); i++) {
						const pokemon = pokemonData.pokemon[i];
						const municipio = municipisData.elements[i];
						const meteorite = meteoritesData[i];

						datosCombinados.push({
							Nombre_Pokemon: pokemon.name,
							Nombre_Municipio: municipio ? municipio.municipi_nom : "N/A",
							name: meteorite ? meteorite.name : "N/A",
						});
					}

					// Mostrar la tabla en la consola
					console.table(datosCombinados);
				});
			});
		})
		.catch((error) => console.error("Error fetching data:", error));
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