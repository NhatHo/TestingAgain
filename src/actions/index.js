/**
 * Action declaration file
 */

export const CREATE_ITEMS = 'CREATE_ITEMS'
export const CREATE_ITEMS_ASYNC = 'CREATE_ITEMS_ASYNC'
export const CLEAR_ITEMS = 'CLEAR_ITEMS'
export const DELETE_ITEM = 'DELETE_ITEM'
export const DELETE_ITEM_ASYNC = 'DELETE_ITEM_ASYNC'
export const SCROLL_ON_GENERATION = 'SCROLL_ON_GENERATION'
export const REORDER_LIST = 'REORDER_LIST'
export const STORE_DATA_ASYNC = 'STORE_DATA_ASYNC'
export const STORE_DATA = 'STORE_DATA'
export const RETRIEVE_DATA_ASYNC = 'RETRIEVE_DATA_ASYNC'
export const RETRIEVE_DATA = 'RETRIEVE_DATA'

const createItems = (itemCount) => ({
  type: CREATE_ITEMS_ASYNC,
  itemCount
})

const clearItems = () => ({
  type: CLEAR_ITEMS
})

const deleteItem = (index) => ({
  type: DELETE_ITEM_ASYNC,
  index
})

const setScrollOnGeneration = (scrollOnGeneration) => ({
  type: SCROLL_ON_GENERATION,
  scrollOnGeneration
})

const reorderList = (oldIndex, newIndex) => ({
  type: REORDER_LIST,
  oldIndex,
  newIndex
})

const storeData = () => ({
  type: STORE_DATA_ASYNC
})

const retrieveData = () => ({
  type: RETRIEVE_DATA_ASYNC
})

const actions = {
  createItems,
  clearItems,
  deleteItem,
  setScrollOnGeneration,
  reorderList,
  storeData,
  retrieveData
}

export default actions
