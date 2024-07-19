import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  section1: {
    age: '',
    dob: '',
    hobbies: '',
    interest: '',
    smoking: '',
    drinking: '',
    qualification: '',
    profilePic: '',
    additionalImages: [],
    shortReel: '',
  },
  section2: {
    employmentType: '',
    companyName: '',
    designation: '',
    location: '',
    title: '',
    expertiseLevel: '',
  },
  section3: {
    relationshipType: '',
  },
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    updateSection1(state, action) {
      state.section1 = action.payload;
    },
    updateSection2(state, action) {
      state.section2 = action.payload;
    },
    updateSection3(state, action) {
      state.section3 = action.payload;
    },
    resetRegistration(state) {
      return initialState;
    },
  },
});

export const { updateSection1, updateSection2, updateSection3, resetRegistration } = registrationSlice.actions;

export default registrationSlice.reducer;
