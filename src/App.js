import React, { useEffect, useState } from 'react';
import './App.css';

// THERE IS ANOTHER VERSION OF THIS IN 'express-react-project'

function App() {
  return (
    <GradeBook />
  );
  // const [backendData, setBackendData] = useState([{}]);

  // useEffect(() => {
  //   fetch("/api").then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setBackendData(data)
  //     }
  //   )
  // }, [])
  
  // return (
  //   <div>
  //     {(typeof backendData.users === 'undefined') ? (
  //       <p>Loading...</p>
  //     ): (
  //       backendData.users.map((user, i) => {
  //         return <p key={i}>{user}</p>
  //       })
  //     )}
  //   </div>
  // )
}

function GradeBook() {
  return (
    <div>
      <Header />
      <FilterRow />
      <GradeTable students={STUDENTS} />
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1>Gradebook</h1>
    </div>
  );
}

function FilterRow() {
  return (
    <div>
      <p className="dropdown-title">Semester:</p>
      <select name="Semester" className="drop-down">
        <option value="Fall 2024">Fall 2024</option>
      </select>
      <p className="dropdown-title">Section:</p>
      <select name="Section" className="drop-down">
        <option value="A">A</option>
      </select>
    </div>
  )
}

function GradeTable({ students }) {
  // let [studentsState, setStudentsState] = useState(students.toSpliced());

  const rows = [];
  
  students.forEach((student) => {
    rows.push(
      <GradeRow 
        student={student} 
        key={student.name} />
    )
  })

  return (
    <table>
      <thead>
        <GradeHeaderRow />
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

function GradeHeaderRow() {
  return (
    <tr>
      <th>Student</th>
      <th>Overall Average</th>
      <th>Assignment 1</th>
      <th>Assignment 2</th>
      <th>Assignment 3</th>
    </tr>
  )
}

function GradeRow({ student }) {  
  const [studentInfo, setStudentInfo] = useState(student);
  
  function onButtonClick() {
    let deleteEntry = prompt("Delete entry?", "no");
    if (deleteEntry.toLowerCase() == "yes") {
      setStudentInfo({});
    } else {
      let nameInput = prompt("Student name:", studentInfo.name);
      let assignment1Input = prompt("Assignment 1 grade:", studentInfo.assignment1);
      let assignment2Input = prompt("Assignment 2 grade:", studentInfo.assignment2);
      let assignment3Input = prompt("Assignment 3 grade:", studentInfo.assignment3);
      setStudentInfo(
        {name: nameInput, 
        assignment1: Number(assignment1Input), 
        assignment2: Number(assignment2Input), 
        assignment3: Number(assignment3Input)});
    }

  }

  return (
    <tr>
      <td>
          {studentInfo.name} 
          <button onClick={onButtonClick}>edit</button></td>
      <td>{Math.round((studentInfo.assignment1 + studentInfo.assignment2 + studentInfo.assignment3) / 3)}</td>
      <td>{studentInfo.assignment1}</td>
      <td>{studentInfo.assignment2}</td>
      <td>{studentInfo.assignment3}</td>
    </tr>
  )
}

const STUDENTS = [
  {name: "Hannah Abbot", assignment1: 90, assignment2: 92, assignment3: 95},
  {name: "Susan Bones", assignment1: 82, assignment2: 74, assignment3: 83},
  {name: "Terry Boot", assignment1: 86, assignment2: 67, assignment3: 76},
  {name: "Mandy Brocklehurst", assignment1: 43, assignment2: 65, assignment3: 23},
  {name: "Millicent Bullstrode", assignment1: 56, assignment2: 36, assignment3: 67},
  {name: "Justin Finch-Fletchley", assignment1: 72, assignment2: 74, assignment3: 99}
];

export default App;