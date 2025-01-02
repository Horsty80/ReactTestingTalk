import { meetupsMock } from "../mocks/mockMeetup";

function Simple() {
  

  return (
    <div className="">
      <h1>Meetup List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {meetupsMock.map((meetup, index) => (
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

export default Simple;
