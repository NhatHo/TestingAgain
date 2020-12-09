import {
  CREATE_ITEMS,
  CLEAR_ITEMS,
  DELETE_ITEM,
  SCROLL_ON_GENERATION,
  REORDER_LIST,
  STORE_DATA,
  RETRIEVE_DATA
} from '../actions'
import { List as ImmutableList } from 'immutable'

const initialState = {
  items: ImmutableList([]),
  scrollOnGeneration: false,
  disableSave: true
}

const itemStore = (state = initialState, action = {}) => {
  const { type, generatedItems } = action
  switch (type) {
    case CREATE_ITEMS: {
      return {
        ...state,
        items: state.items.concat(generatedItems),
        disableSave: false
      }
    }
    case CLEAR_ITEMS: {
      return {
        ...state,
        items: ImmutableList([]),
        disableSave: false
      }
    }
    case DELETE_ITEM: {
      const { index } = action
      return {
        ...state,
        items: state.items.delete(index),
        disableSave: false
      }
    }
    case SCROLL_ON_GENERATION: {
      const { scrollOnGeneration } = action
      return {
        ...state,
        scrollOnGeneration
      }
    }
    case REORDER_LIST: {
      const { oldIndex, newIndex } = action
      const { items } = state
      // Swap places between old and new index
      const draggedText = items.get(oldIndex)
      return {
        ...state,
        items: items.delete(oldIndex).insert(newIndex, draggedText),
        disableSave: false
      }
    }
    case STORE_DATA: {
      return {
        ...state,
        disableSave: true
      }
    }
    case RETRIEVE_DATA: {
      return {
        ...state,
        items: state.items.concat(generatedItems)
      }
    }
    default:
      return state
  }
}

export default itemStore
