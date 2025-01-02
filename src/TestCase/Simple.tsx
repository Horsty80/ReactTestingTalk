function Simple() {
  const meetups = [
    {name: "Touraine Tech", date: "2025-02-06", location: "Tours" },
    {name: "DevQuest", date: "2025-06-12", location: "Niort" },
    { name: 'Devfest', date: '2025-10-16', location: 'Nantes' },
    {name: "Devoxx", date: "2025-04-16", location: "Paris" },
    
  ];

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
          {meetups.map((meetup, index) => (
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
