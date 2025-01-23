import { Route } from "../routes/event";
import { useFetchMeetupsQuery } from "../services/meetup";

function AsyncDataWithQueryParams() {
  const { eventName, location } = Route.useSearch();
  const { data: meetups, isLoading } = useFetchMeetupsQuery();

  return (
    <div className="">
      <h1>Meetup List with Query Params</h1>

      {/* Show filter */}
      <div>
        <label htmlFor="eventName">Event Name:</label>
        <span>{eventName}</span>
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <span>{location}</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={3}>Loading...</td>
            </tr>
          )}
          {!meetups && (
            <tr>
              <td colSpan={3}>No meetups - click the fetch button</td>
            </tr>
          )}
          {meetups &&
            meetups
              ?.filter((meetup) => {
                if (eventName && location) {
                  return meetup.name.includes(eventName) && meetup.location.includes(location);
                }
                if (eventName) {
                  return meetup.name.includes(eventName);
                }
                if (location) {
                  return meetup.location.includes(location);
                }
                return true;
              })
              .map((meetup, index) => (
                <tr key={index}>
                  <td>{meetup.name}</td>
                  <td>{meetup.date}</td>
                  <td>{meetup.location}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default AsyncDataWithQueryParams;
