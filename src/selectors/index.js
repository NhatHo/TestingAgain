/**
 * A few selectors that would help retrieving data from reducers easier.
 * This allows it to be shared across files
 */

const reducer = (state) => state.itemStore
const getItemsList = (state) => reducer(state).items || []
const getScrollOnGeneration = (state) => reducer(state).scrollOnGeneration
const disableSave = (state) => reducer(state).disableSave

const selectors = { reducer, getItemsList, getScrollOnGeneration, disableSave }
export default selectors
