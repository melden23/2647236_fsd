import { useState } from "react";
import "./index.css";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "John", present: 8, total: 10 },
    { id: 2, name: "Mary", present: 9, total: 10 },
    { id: 3, name: "David", present: 7, total: 10 },
  ]);

  const [name, setName] = useState("");

  const addStudent = () => {
    if (name.trim() === "") return;

    const newStudent = {
      id: Date.now(),
      name: name,
      present: 0,
      total: 0,
    };

    setStudents([...students, newStudent]);
    setName("");
  };

  const markAttendance = (id, isPresent) => {
    setStudents(
      students.map((student) => {
        if (student.id === id) {
          return {
            ...student,
            present: isPresent
              ? student.present + 1
              : student.present,
            total: student.total + 1,
          };
        }
        return student;
      })
    );
  };

  const totalStudents = students.length;
  const totalPresent = students.reduce(
    (sum, student) => sum + student.present,
    0
  );
  const totalClasses = students.reduce(
    (sum, student) => sum + student.total,
    0
  );

  return (
    <div className="container">
      <h1> Student Attendance System</h1>

      <div className="addStudent">
        <input
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={addStudent}>Add Student</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Present</th>
            <th>Total Classes</th>
            <th>Attendance %</th>
            <th>Mark Attendance</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>

              <td>{student.present}</td>

              <td>{student.total}</td>

              <td>
                {student.total === 0
                  ? "0%"
                  : ((student.present / student.total) * 100).toFixed(1) + "%"}
              </td>

              <td>
                <button
                  className="presentBtn"
                  onClick={() => markAttendance(student.id, true)}
                >
                  Present
                </button>

                <button
                  className="absentBtn"
                  onClick={() => markAttendance(student.id, false)}
                >
                  Absent
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="summary">
        <div className="card">
          <h2>{totalStudents}</h2>
          <p>Total Students</p>
        </div>

        <div className="card">
          <h2>{totalPresent}</h2>
          <p>Total Presents</p>
        </div>

        <div className="card">
          <h2>{totalClasses}</h2>
          <p>Total Classes</p>
        </div>
      </div>
    </div>
  );
}

export default App;