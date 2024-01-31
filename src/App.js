import React, { useState, useEffect } from 'react';

const App = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => {
    // Fetch data from API
    fetch('https://backendexample.sanbercloud.com/api/student-scores')
      .then(response => response.json())
      .then(data => setStudents(data));
  }, []);

  const handleDelete = id => {
    fetch(`https://backendexample.sanbercloud.com/api/student-scores/${id}`, {
      method: 'DELETE',
    }).then(() => setStudents(students.filter(item => item.id !== id)));
  };

  const handleSubmit = () => {
    // Add new data
    fetch('https://backendexample.sanbercloud.com/api/student-scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, course, score }),
    })
      .then(response => response.json())
      .then(newData => setStudents([...students, newData]));
    
    setName('');
    setCourse('');
    setScore('');
  };

  return (
  <div>
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '8px', border: '1px solid black' }}>NO</th>
          <th style={{ textAlign: 'left', padding: '8px', border: '1px solid black' }}>NAMA</th>
          <th style={{ textAlign: 'left', padding: '8px', border: '1px solid black' }}>MATA KULIAH</th>
          <th style={{ textAlign: 'left', padding: '8px', border: '1px solid black' }}>NILAI</th>
          <th style={{ textAlign: 'left', padding: '8px', border: '1px solid black' }}>INDEKS NILAI</th>
          <th style={{ textAlign: 'left', padding: '8px', border: '1px solid black' }}>ACTION</th>
        </tr>
        
      </thead>
      <tbody>
        {students.map(student => (
         <tr>
         <td style={{ textAlign: 'left', padding: '8px', border: '1px solid black' }}>11</td>
         <td style={{ textAlign: 'left', padding: '8px', border: '1px solid black' }}>nana</td>
         <td style={{ textAlign: 'left', padding: '8px', border: '1px solid black' }}>Kalkulus</td>
         <td style={{ textAlign: 'left', padding: '8px', border: '1px solid black' }}>98</td>
         <td style={{ textAlign: 'left', padding: '8px', border: '1px solid black' }}>A</td>
       </tr>
        
        
        ))}
        

        </tbody>
        
    </table>
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Course:
        <input type="text" value={course} onChange={e => setCourse(e.target.value)} />
      </label>
      <label>
        Score:
        <input type="text" value={score} onChange={e => setScore(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  </div>
  )
        };

export default App;