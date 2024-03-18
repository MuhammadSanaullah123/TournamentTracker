import { apiSlice } from "./apiSlice";

const USERS_URL = "http://localhost:5000/api/users";

export const tournamentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlayersById: builder.mutation({
      query: (id) => {
        const url = new URL(
          `https://app.matchplay.events/api/tournaments/${id}`
        );

        const headers = {
          Authorization: "Bearer YOUR_API_TOKEN",
          "Content-Type": "application/json",
          Accept: "application/json",
        };
        const params = {
          includePlayers: "1",
          includeArenas: "1",
          includeBanks: "1",
          includeScorekeepers: "1",
          includeSeries: "1",
          includeLocation: "1",
          includeRsvpConfiguration: "1",
          includeParent: "1",
          includePlayoffs: "1",
          includeShortcut: "1",
          includeEvent: "1",
          includeCompetitionNotes: "1",
        };
        Object.keys(params).forEach((key) =>
          url.searchParams.append(key, params[key])
        );

        return {
          url: url.toString(),
          method: "GET",
        };
      },
    }),

    getTourMaxMatchPlay: builder.mutation({
      query: (id) => ({
        url: `https://app.matchplay.events/api/tournaments/${id}/max-matchplay`,
        method: "GET",
      }),
    }),
    getTourStandings: builder.mutation({
      query: (id) => ({
        url: `https://app.matchplay.events/api/tournaments/${id}/standings`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetTourMaxMatchPlayMutation,
  useGetAllPlayersByIdMutation,
  useGetTourStandingsMutation,
} = tournamentApiSlice;
