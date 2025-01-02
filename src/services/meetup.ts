import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Meetup } from '../models/meetup';

const baseUrl = process.env.NODE_ENV === 'test' ? globalThis.BASE_URL + '/api' : '/api';

const meetupApi = createApi({
  reducerPath: 'meetupApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    fetchMeetups: builder.query<Meetup[], void>({
      query: () => 'meetups',
    }),
  }),
});

export const { useFetchMeetupsQuery, useLazyFetchMeetupsQuery } = meetupApi;

export default meetupApi;
