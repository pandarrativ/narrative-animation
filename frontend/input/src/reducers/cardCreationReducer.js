import { createSlice } from '@reduxjs/toolkit'

export const cardCreationSlice = createSlice({
  name: 'cardCreation',
  initialState: {
    goal:"",
    goalDimensions: [],
    storyConversation: [],
    story:"",  // might add format
    storySegment: [],
    imageGeneration: [],
  },
  reducers: {
    loadCardInformation: (state, action) => {  // load data from database and add it to redux
        state.goal = action.payload.goal;
        state.goalDimensions = action.payload.goalDimensions;
        state.storyConversation = action.payload.storyConversation;
        state.story = action.payload.story;
        state.storySegment = action.payload.storySegment;
        state.imageGeneration = action.payload.imageGeneration;
    },
    setGoal: (state, action) => {
        state.goal = action.payload
    },
  }
})


export const cardCreationActions = cardCreationSlice.actions
export default cardCreationSlice.reducer