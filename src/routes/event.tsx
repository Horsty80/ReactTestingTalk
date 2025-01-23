import { createFileRoute } from '@tanstack/react-router'
import AsyncDataWithQueryParams from '../TestCase/AsyncDataWithQueryParams'
import { store } from '../store'
import meetupApi from '../services/meetup'

type EventSearch = {
  location: string
  eventName: string
}

const validateLocationSearch = (
  search: Record<string, unknown>,
): EventSearch => {
  // Validate and parse the search params into a typed state
  return {
    location: (search.location as string) || '',
    eventName: (search.eventName as string) || '',
  }
}

// Dispatch ReduxToolKit initiate fetchMeetups
const fetchMeetups = async () => {
  const promise = store.dispatch(meetupApi.endpoints.fetchMeetups.initiate());
  await promise;
  promise.unsubscribe();
}

export const Route = createFileRoute('/event')({
  component: AsyncDataWithQueryParams,
  validateSearch: validateLocationSearch,
  loader: fetchMeetups,
})
