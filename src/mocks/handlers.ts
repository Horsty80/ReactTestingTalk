import { delay, http, HttpResponse } from 'msw'
import { meetupsMock } from './mockMeetup'
 
export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('*/api/meetups',async () => {
    // ...and respond to them using this JSON response.
    await delay(500);
    return HttpResponse.json(meetupsMock)
  }),
]