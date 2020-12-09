import { takeLatest, all, put, takeEvery, select } from 'redux-saga/effects'
import { LoremIpsum } from 'lorem-ipsum'
import selectors from '../selectors'
import { store, retrieve } from '../helpers/localStorage'

import {
  CREATE_ITEMS,
  CREATE_ITEMS_ASYNC,
  DELETE_ITEM_ASYNC,
  DELETE_ITEM,
  STORE_DATA_ASYNC,
  STORE_DATA,
  RETRIEVE_DATA_ASYNC,
  RETRIEVE_DATA
} from '../actions'

// These can be added as customizable fields if I have more time
const MAX_SENTENCES = 2
const MIN_SENTENCES = 1
const MAX_WORDS_PER_SENTENCE = 5
const MIN_WORDS_PER_SENTENCE = 1

// Can be expose to be customizable from the UI
const MIN_RAND = 1
const MAX_RAND = 10

const KEY = 'OWL_ASSIGNMENT'

const getARandomNumber = () => Math.floor(Math.random() * MAX_RAND + MIN_RAND)

function* createItems({ itemCount }) {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: { max: MAX_SENTENCES, min: MIN_SENTENCES },
    wordsPerSentence: {
      max: MAX_WORDS_PER_SENTENCE,
      min: MIN_WORDS_PER_SENTENCE
    }
  })
  const generatedItems = [...Array(itemCount)].map(() =>
    lorem.generateParagraphs(getARandomNumber())
  )
  yield put({ type: CREATE_ITEMS, generatedItems })
}

function* deleteItem({ index }) {
  yield put({ type: DELETE_ITEM, index })
}

function* storeData() {
  const items = yield select(selectors.getItemsList)
  store(KEY, JSON.stringify(items))
  yield put({ type: STORE_DATA })
}

function* retrieveData() {
  const itemLists = retrieve(KEY)
  const generatedItems = JSON.parse(itemLists) || []
  yield put({ type: RETRIEVE_DATA, generatedItems })
}

export default function* rootSaga() {
  yield all([
    takeLatest(CREATE_ITEMS_ASYNC, createItems),
    takeEvery(DELETE_ITEM_ASYNC, deleteItem),
    takeLatest(STORE_DATA_ASYNC, storeData),
    takeLatest(RETRIEVE_DATA_ASYNC, retrieveData)
  ])
}
