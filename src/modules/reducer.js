import ACTIONS from "./action";
import _ from "lodash";

const defaultState = {
  items: [],
  pokemons: [
    {name: "Crabominable", img: "https://vignette.wikia.nocookie.net/es.pokemon/images/0/0a/Crabominable_SL.png/revision/latest/scale-to-width-down/96?cb=20161201173232", types1: "Fighting", types2: "Ice", height: "340 foots", weight: "500 pounds", gender: "C'est masculine", catchRate: "Alta"},
    {name: "Crabrawler", img: "https://vignette.wikia.nocookie.net/es.pokemon/images/8/88/Crabrawler_SL.png/revision/latest/scale-to-width-down/96?cb=20161203155126", types1: "Fighting", types2: "", height: "100 foots", weight: "600 pounds", gender: "C'est masculine", catchRate: "Odd"},
    {name: "Vikavolt", img: "https://vignette.wikia.nocookie.net/es.pokemon/images/7/7b/Vikavolt_SL.png/revision/latest/scale-to-width-down/96?cb=20161201180405", types1: "Bug", types2: "Electric", height: "90 foots", weight: "100 pounds", gender: "C'est ", catchRate: "34"},
    {name: "Charjabug", img: "https://vignette.wikia.nocookie.net/es.pokemon/images/1/1a/Charjabug_SL.png/revision/latest/scale-to-width-down/96?cb=20161201173222", types1: "Bug", types2: "Electric", height: "4 foots", weight: "500 pounds", gender: "Macho", catchRate: "Okay"},
    {name: "Grubbin", img: "https://vignette.wikia.nocookie.net/es.pokemon/images/6/63/Grubbin_SL.png/revision/latest/scale-to-width-down/96?cb=20161201180120", types1: "Bug", types2: "", height: "11 foots", weight: "581 pounds", gender: "Macho", catchRate: "Odd"}
  ],
  filteredPokemons: [
    {name: "Crabominable", img: "https://vignette.wikia.nocookie.net/es.pokemon/images/0/0a/Crabominable_SL.png/revision/latest/scale-to-width-down/96?cb=20161201173232", types1: "Fighting", types2: "Ice", height: "340 foots", weight: "500 pounds", gender: "C'est masculine", catchRate: "Alta"},
    {name: "Crabrawler", img: "https://vignette.wikia.nocookie.net/es.pokemon/images/8/88/Crabrawler_SL.png/revision/latest/scale-to-width-down/96?cb=20161203155126", types1: "Fighting", types2: "", height: "100 foots", weight: "600 pounds", gender: "C'est masculine", catchRate: "Odd"},
    {name: "Vikavolt", img: "https://vignette.wikia.nocookie.net/es.pokemon/images/7/7b/Vikavolt_SL.png/revision/latest/scale-to-width-down/96?cb=20161201180405", types1: "Bug", types2: "Electric", height: "90 foots", weight: "100 pounds", gender: "C'est ", catchRate: "34"},
    {name: "Charjabug", img: "https://vignette.wikia.nocookie.net/es.pokemon/images/1/1a/Charjabug_SL.png/revision/latest/scale-to-width-down/96?cb=20161201173222", types1: "Bug", types2: "Electric", height: "4 foots", weight: "500 pounds", gender: "Macho", catchRate: "Okay"},
    {name: "Grubbin", img: "https://vignette.wikia.nocookie.net/es.pokemon/images/6/63/Grubbin_SL.png/revision/latest/scale-to-width-down/96?cb=20161201180120", types1: "Bug", types2: "", height: "11 foots", weight: "581 pounds", gender: "Macho", catchRate: "Odd"}
  ],
  pokemonTypes: [ 
    'Normal', 
    'Fighting',
    'Flying',
    'Poison',
    'Ground',
    'Rock',
    'Bug',
    'Ghost',
    'Steel',
    'Fire',
    'Water',
    'Grass',
    'Electric',
    'Psychic',
    'Ice',
    'Dragon',
    'Fairy',
    'Dark'
  ]
};

const todoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.Types.CREATE_ITEM: {
      console.log(action);

      let item = action.payload;
      let newItem = { id: state.items.length + 1, description: item };
      let newState = _.cloneDeep(state);
      newState.items.push(newItem);
      return newState;
    }

    case ACTIONS.Types.DELETE_ITEM: {
      let newState = _.cloneDeep(state);
      console.log(action.payload);
      let index = _.findIndex(newState.items, { id: action.payload });
      newState.items.splice(index, 1);
      return newState;
    }

    case ACTIONS.Types.SAVE_POKEMON: {

      console.log(action.payload);

      let newPokemon = {
        name: action.payload.name,
        img: action.payload.img,
        types1: action.payload.types1,
        types2: action.payload.types2,
        height: action.payload.height,
        weight: action.payload.weight,
        gender: action.payload.gender,
        catchRate: action.payload.catchRate
      }
      let newState = _.cloneDeep(state);
      newState.pokemons.push(newPokemon);
      newState.filteredPokemons = {...newState.pokemons}; //Update the filtered pokemons array when user saves one
      return newState;

    }

    case ACTIONS.Types.SEARCH_POKEMON: {
      
    }

    default:
      return state;
  }
};

export default todoReducer;