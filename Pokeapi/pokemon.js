//------------------------------------RETO 5 DIA5 LA POKEAPI 
//En este reto, vamos a consumir una API externa:
// 1. Crea un front que conste de un archivo HTML, un JS y un CSS.
// En este caso, la maquetación es libre, pero como mínimo debería tener un formulario con un intput
// (nombre) y al menos un botón
// 2. Lee detenidamente la documentación de la siguiente API: https://pokeapi.co/
// 3. Crea las siguientes funcionalidades:
// ○ Crea una función que recoja el nombre de un Pokemon y lance una petición a la API de Pokemon.
// La respuesta se debe mostrar en la pantalla
// ○ Como mínimo, debe mostrar el nombre, imagen y las distintas habilidades que tiene en formato
// tabla
// OPCIONAL: Investiga el resto de endpoints de la API para añadir funcionalidad a la página
//Defino mi clase Pokemon
class Pokemon{
  
    constructor(name,photo,abilities){
        this.name = name;
        this.photo = photo;
        this.abilities = abilities;
    }
}


//defino  la función buscarPokemon que se llama cuando el usuario realiza una búsqueda
function buscarPokemon(){
    //declaro una variable name para el nombre del pokemon a través del input con el id "pokemon_name".
    let name = document.getElementById("pokemon_name").value;
    //el toLowerCase convierte el nombre a minúsculas para asegurarse de que coincida con el formato esperado por la PokeAPI.
    let pokemon_name = name.toLowerCase();
    //Llamo a la función para obtener información del Pokémon.
    getPokemon(pokemon_name);
}

//esto hace una solicitud (request) a la PokeAPI para obtener información sobre el Pokémon
function getPokemon(pokemon_name){
    //defino un objeto params que contiene la configuración para la solicitud Fetch, 
    //incluyendo el método HTTP (GET) y el tipo de contenido (application/json).
    const params = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    };
    //Aquí realizo una solicitud Fetch a la URL de la PokeAPI utilizando 
    //el nombre del Pokémon proporcionado ejemplo: Togepi
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`, params)
        .then(res => res.json())
        .then(res => {
            // Con los datos obtenidos en la respuesta con exito de la API,
            // creamos un objeto pokemon.
            //extrae la foto del Pokémon (photo) de la respuesta JSON obtenida.
            let photo = res.sprites.other.home.front_default;
            //Se crea una lista de habilidades (habilidades) del Pokémon 
            //a partir de la respuesta JSON.
            let abilities = [];
            for (let i = 0; i < res.abilities.length; i++) {
                abilities.push(res.abilities[i].ability.name);
            }
            
            //Creo un objeto pokemon utilizando la clase Pokemon, 
            //con el nombre, foto y habilidades obtenidos.
            let pokemon = new Pokemon(pokemon_name,photo,abilities);

            //-- Utilizando el objeto pokemon obtenido, mostramos los datos
            //-- por patalla.
            //actualizar la interfaz de usuario en la página web para mostrar la información del Pokémon obtenida de la PokeAPI.
            let card = document.getElementById("card");
            let card_title = document.getElementById("card_title");
            let card_img = document.getElementById("card_img");
            let table = document.getElementById("table");
            let msg_error = document.getElementById("msg_error");
            ///Esto actualiza el contenido HTML del elemento "card_title" con el nombre del Pokémon 
            //con la primera letra en mayúscula).
            card_title.innerHTML = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
            card_img.src = pokemon.photo;
            //Esto actualiza el contenido HTML de la tabla "table" para mostrar las habilidades del Pokémon
            table.innerHTML = `
                <tr>
                    <th>Habilidades</th>
                </tr>
            `
            for (let i = 0; i < pokemon.abilities.length; i++) {
                table.innerHTML += `
                    <tr>
                        <td>${pokemon.abilities[i][0].toUpperCase()+ pokemon.abilities[i].substring(1)}</td>
                    </tr>
                `
            }
            //búsqueda exitosa, se borra cualquier mensaje de error previamente mostrado en el elemento "msg_error".
            msg_error.innerHTML = '';
        })
        .catch(err => {
            console.error(err)
            card_title.innerHTML = 'Pokemon'; //Restablece el título de la tarjeta a "Pokemon" en caso de error.
            card_img.src = './imagenes/pokeball.png';//muestra Pokéball en caso de error.
            table.innerHTML = ''; //Borra el contenido de la tabla en caso de error.
            msg_error.innerHTML = 'No existe ningún Pokemon con el nombre indicado'
        });
}