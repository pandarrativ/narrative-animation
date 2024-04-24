import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from './reducers/exampleSlicer'
import cardCreationReducer from './reducers/cardCreationReducer'

export default configureStore({
  reducer: {
    example: exampleReducer,
    cardCreation:cardCreationReducer,

    //add other reducers here
    //settings: settingsReducer,

  }
})