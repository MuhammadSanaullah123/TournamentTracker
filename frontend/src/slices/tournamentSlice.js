import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tournamentInfo: null,
  matchplayInfo: null,
  standingsInfo: null,
};

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setTournament: (state, action) => {
      state.tournamentInfo = action.payload;
      sessionStorage.setItem("tournamentInfo", JSON.stringify(action.payload));
    },
    setMatchPlay: (state, action) => {
      state.matchplayInfo = action.payload;
      sessionStorage.setItem("matchplayInfo", JSON.stringify(action.payload));
    },
    setStandings: (state, action) => {
      state.standingsInfo = action.payload;
      sessionStorage.setItem("standingsInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setTournament, setMatchPlay, setStandings } =
  tournamentSlice.actions;

export default tournamentSlice.reducer;
