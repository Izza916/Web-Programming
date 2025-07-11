import React, { useState } from 'react';
import './App.css';

function App() {
    const [courses, setCourses] = useState([{ name: '', creditHours: '', grade: '' }]);

    const handleAddCourse = () => {
        if (courses.length < 10) {
            setCourses([...courses, { name: '', creditHours: '', grade: '' }]);
        }
    };

    const handleRemoveCourse = (index) => {
        if (courses.length > 1) {
            const newCourses = courses.filter((_, i) => i !== index);
            setCourses(newCourses);
        }
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newCourses = [...courses];
        newCourses[index][name] = value;
        setCourses(newCourses);
    };

    const calculateGPA = () => {
        const gradePoints = { 'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0 };
        let totalCreditHours = 0;
        let totalGradePoints = 0;

        courses.forEach(course => {
            if (course.grade && course.creditHours) {
                totalCreditHours += parseFloat(course.creditHours);
                totalGradePoints += gradePoints[course.grade] * parseFloat(course.creditHours);
            }
        });

        return totalCreditHours ? (totalGradePoints / totalCreditHours).toFixed(2) : '0.00';
    };

    return (
        <div className="App">
            <h1>GPA Calculator</h1>
            {courses.map((course, index) => (
                <div key={index} className="course-row">
                    <input
                        type="text"
                        name="name"
                        placeholder="Course Name"
                        value={course.name}
                        onChange={(e) => handleInputChange(index, e)}
                        required
                    />
                    <input
                        type="number"
                        name="creditHours"
                        placeholder="Credit Hours"
                        value={course.creditHours}
                        onChange={(e) => handleInputChange(index, e)}
                        min="1"
                        max="3"
                        required
                    />
                    <select
                        name="grade"
                        value={course.grade}
                        onChange={(e) => handleInputChange(index, e)}
                        required
                    >
                        <option value="">Select Grade</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                    </select>
                    <button onClick={() => handleRemoveCourse(index)} disabled={courses.length === 1}>-</button>
                </div>
            ))}
            <button onClick={handleAddCourse} disabled={courses.length === 10}>+</button>
            <div className="gpa-result">
                <h2>GPA: {calculateGPA()}</h2>
            </div>
        </div>
    );
}

export default App;