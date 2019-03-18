// types of action
const Types = {
    CREATE_ITEM: "CREATE_ITEM",
    DELETE_ITEM: "DELETE_ITEM",
    SAVE_POKEMON: "SAVE_POKEMON",
    SEARCH_POKEMON: "SEARCH_POKEMON"
  };
  // actions
  const createItem = task => ({
    type: Types.CREATE_ITEM,
    payload: task
  });
  
  const deleteItem = id => ({
    type: Types.DELETE_ITEM,
    payload: id
  });

  const savePokemon = pokemon => ({
    type: Types.SAVE_POKEMON,
    payload: pokemon
  });

  const searchPokemon = name => ({
    type: Types.SEARCH_POKEMON,
    payload: name
  });
  
  export default {
    createItem,
    deleteItem,
    savePokemon,
    searchPokemon,
    Types
  };