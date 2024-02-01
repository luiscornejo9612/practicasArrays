let datosCombinados = [];

//FUNCION PARA PASARLE LA URL DE JSON QUE QUEREMOS OBTENER
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error al obtener datos de ${url}`);
    }
    return response.json();
}

//CARGAR LOS DATOS DE LOS JSON EN UNA TABLA POR CONSOLA 
function mostrarDadesConsola() {
    // Realizar la solicitud para obtener los datos de los Pokémon
    fetchData("js/data/pokemon.json").then((pokemonData) => {
        // Realizar la solicitud para obtener los datos de los municipios
        return fetchData("js/data/municipis.json").then((municipisData) => {
            // Realizar la solicitud para obtener los datos de los movies
            return fetchData("js/data/movies.json").then((moviesData) => {

                // Realizar la solicitud para obtener los datos de los meteoritos
                return fetchData("js/data/earthMeteorites.json").then((meteoritesData) => {
                    const datosConsola = [];

                    for (let i = 0; i < Math.min(pokemonData.pokemon.length,
                        municipisData.elements.length, meteoritesData.length, moviesData.length); i++) {
                        const pokemon = pokemonData.pokemon[i];
                        const municipio = municipisData.elements[i];
                        const movies = moviesData[i];
                        const meteorite = meteoritesData[i];

                        datosConsola.push({
                            Nombre_Pokemon: pokemon.name,
                            Nombre_Municipio: municipio.municipi_nom,
                            Movies_Tiltle: movies.title,
                            Nombre_Meteorite: meteorite.name
                        });
                    }
                    // Mostrar la tabla en la consola
                    console.table(datosConsola);
                });
            });
        });
    })
        .catch((error) => console.error("Error recuperando datos:", error));
}



// // POKEMON
// fetch("js/data/pokemon.json")
// .then((response) => response.json())
// .then((data) => {
//     dades = data.pokemon;		

//     console.log(dades)
//     console.log(dades[0].name)
// });
async function mostrarDadesPokemon() {
    try {
        datosCombinados = [];
        // Utilizar fetchData
        const data = await fetchData("js/data/pokemon.json");
        const dades = data.pokemon;

        // CONTADOR PARA ORDENAR LOS ELEMENTOS DE FORMA HACENDENTE O DECENDENTE 
        let num = 1;

        // Utilizar map para transformar los datos de manera más eficiente
        datosCombinados = dades.map((pokemon) => ({
            Num: num++,
            Num: pokemon.num,
            Imagen: pokemon.img,
            Nombre: pokemon.name,
            Peso: pokemon.weight
        }));

        // Llamada a printList después de que se han procesado todos los datos
        printList();
        console.log(datosCombinados);

    } catch (error) {
        console.error("Error recuperando datos:", error);
    }
}

// // MOVIES
// fetch("js/data/movies.json")
// .then((response) => response.json())
// .then((data) => {
//     dades = data.movies;		

//     console.log(dades)
//     console.log(dades[0].title)
// });
async function mostrarDadesmovies() {
    try {
        datosCombinados = [];
        const data = await fetchData("js/data/movies.json");

        // CONTADOR PARA ORDENAR LOS ELEMENTOS DE FORMA HACENDENTE O DECENDENTE 
        let num = 1;

        // Utilizar map para transformar los datos de manera más eficiente
        datosCombinados = data.map((movies) => ({
            Num: num++,
            Nombre: movies.title,
            Imagen: movies.url,
            Generes: movies.genres,
            Año: movies.year
        }));

        // Llamada a printList después de que se han procesado todos los datos
        printList();
        console.log(datosCombinados);

    } catch (error) {
        console.error("Error recuperando datos:", error);
    }
}



/*
// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
    dades = data.elements;		
	
    console.log(dades)
    console.log(dades[0].municipi_nom)
});*/
async function mostrarDadesmunicipis() {
    try {
        datosCombinados = [];
        const data = await fetchData("js/data/municipis.json");
        const dades = data.elements;

        // CONTADOR PARA ORDENAR LOS ELEMENTOS DE FORMA HACENDENTE O DECENDENTE 
        let num = 1;

        // Utilizar map para transformar los datos de manera más eficiente
        datosCombinados = dades.map((municipio) => ({
            Num: num++,
            Municipi_Nom: municipio.municipi_nom,
            Provincia_nom: municipio.grup_provincia.provincia_nom,
            Imagen: municipio.municipi_escut,
            Comarca_nom: municipio.grup_comarca.comarca_nom
        }));

        // Llamada a printList después de que se han procesado todos los datos
        printList();
        console.log(datosCombinados);

    } catch (error) {
        console.error("Error recuperando datos:", error);
    }
}


// METEORITS
// fetch("js/data/earthMeteorites.json")
// .then((response) => response.json())
// .then((data) => {
//     dades = data;		

//     console.log(dades)
//     console.log(dades[0].name)
// });
async function mostrarDadesMeteorites() {
    try {
        datosCombinados = [];
        // Utilizar fetchData para obtener los datos de manera genérica
        const data = await fetchData("js/data/earthMeteorites.json");

        // CONTADOR PARA ORDENAR LOS ELEMENTOS DE FORMA HACENDENTE O DECENDENTE 
        let num = 1;

        // Utilizar map para transformar los datos de manera más eficiente
        datosCombinados = data.map((meteorito) => ({
            Num: num++,
            Id: meteorito.id,
            Name: meteorito.name,
            Masa: meteorito.mass,
            Anyo: meteorito.year
        }));

        // Llamada a printList después de que se han procesado todos los datos
        printList();
        console.log(datosCombinados);

    } catch (error) {
        console.error("Error recuperando datos:", error);
    }
}


let opcionSeleccionada;


function seleccionarAccion() {

    opcionSeleccionada = document.getElementById("seleccionarOpcion").value;

    switch (opcionSeleccionada) {
        case "pokemon":
            mostrarDadesPokemon();
            break;
        case "movies":
            mostrarDadesmovies();
            break;
        case "municipis":
            mostrarDadesmunicipis();
            break;
        case "meteorites":
            mostrarDadesMeteorites();
            break;
        case "consola":
            mostrarDadesConsola();
            break;
        default:
            break;
    }

    // Imprimirá el valor después de la asignación
    console.log(opcionSeleccionada);
}

// fUNCION PARA CREAR LA TABLA EN EL DOM
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
            if (key === 'Imagen') {
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

//FUNCION PARA RECARGAR LA PAGINA
function recargarPagina() {
    location.reload();
}


//FUNCION PARA ORDENAR LOS ELEMENTOS DE FORMA ACENDENTE Y DECENDENTE 
function orderList(order) {
    datosCombinados.sort((a, b) => {
        const valueA = a.Num;
        const valueB = b.Num;
        return order === 'asc' ? valueA - valueB : valueB - valueA;
    });
    printList();
}

function buscarObjetoPorNombre(datos, nombreBuscado, propiedadNombre = "Nombre") {
    return datos.find(item => item[propiedadNombre].toLowerCase() === nombreBuscado.toLowerCase());
}

//FUNCION PARA BUSCAR EL ELEMENTO MEDIANTE UN ALERT
async function searchList() {
    var nombreBuscado = prompt("Introduce el nombre");

    if (nombreBuscado && datosCombinados.length > 0) {
        let objetoBuscado;

        switch (opcionSeleccionada) {
            case "pokemon":
                objetoBuscado = buscarObjetoPorNombre(datosCombinados, nombreBuscado);
                break;
            case "movies":
                objetoBuscado = buscarObjetoPorNombre(datosCombinados, nombreBuscado);
                break;
            case "municipis":
                objetoBuscado = buscarObjetoPorNombre(datosCombinados, nombreBuscado, "Municipi_Nom");
                break;
            case "meteorites":
                objetoBuscado = buscarObjetoPorNombre(datosCombinados, nombreBuscado, "Name");
                break;
            default:
                alert("Error: Opción no válida.");
                return;
        }

        if (objetoBuscado && opcionSeleccionada == "pokemon") {
            datosCombinados = [];
            const dades = {
                Num: objetoBuscado.Num++,
                Imagen: objetoBuscado.Imagen,
                Nombre: objetoBuscado.Nombre,
                Peso: objetoBuscado.Peso
            };
            datosCombinados.push(dades);
            printList();
        }

        else if (objetoBuscado && opcionSeleccionada == "movies") {
            datosCombinados = [];
            const dades = {
                Num: objetoBuscado.Num++,
                Nombre: objetoBuscado.Nombre,
                Imagen: objetoBuscado.Imagen,
                Generes: objetoBuscado.Generes,
                Año: objetoBuscado.Año
            };
            datosCombinados.push(dades);
            printList();
        }
        else if (objetoBuscado && opcionSeleccionada == "municipis") {
            datosCombinados = [];
            const dades = {
                Num: objetoBuscado.Num++,
                Municipi_Nom: objetoBuscado.Municipi_Nom,
                Provincia_nom: objetoBuscado.Provincia_nom,
                Imagen: objetoBuscado.Imagen,
                Comarca_nom: objetoBuscado.Comarca_nom
            };
            datosCombinados.push(dades);
            printList();
        }
        else if (objetoBuscado && opcionSeleccionada == "meteorites") {
            datosCombinados = [];
            const dades = {
                Num: objetoBuscado.Num++,
                Id: objetoBuscado.Id,
                Name: objetoBuscado.Name,
                Masa: objetoBuscado.Masa,
                Anyo: objetoBuscado.Anyo
            };
            datosCombinados.push(dades);
            printList();
        }
        else {
            alert(`El objeto ${opcionSeleccionada} no fue encontrado`);
        }
    } else {
        alert("Error: 'datosCombinados' no está definido o está vacío.");
    }
}


//FUNCION PARA CALCULAR LA MEDIA DEL PESO DE LOS POKEMON 
function calcMedia() {
    const valores = datosCombinados.map(item => parseFloat(item.PESO.replace(' kg', '')));
    const media = valores.reduce((acc, val) => acc + val, 0) / valores.length;
    alert(`La media del peso de los Pokemon es: ${media.toFixed(2)} kg`);
}





