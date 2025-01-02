import { useLazyFetchMeetupsQuery } from "../services/meetup";

function AsyncData() {
  const [fetchMeetup, { data: meetups, isLoading }] = useLazyFetchMeetupsQuery();

  const handleFetchData = () => {
    fetchMeetup();
  };

  return (
    <div className="">
      <h1>Meetup List</h1>
      <button onClick={handleFetchData}>Fetch Meetups</button>
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
          {/* placeholder if no meetups */}
          {!meetups && (
            <tr>
              <td colSpan={3}>No meetups - click the fetch button</td>
            </tr>
          )}
          {meetups?.map((meetup, index) => (
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

export default AsyncData;
