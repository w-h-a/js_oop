const createStudent = function(name, year) {
  return {
    name,
    year,
    courses: [],
    info: function() {
      console.log(`${this.name} is a ${this.year} year student.`);
    },
    listCourses: function() {
      console.log(this.courses);
    },
    addCourse: function(course) {
      this.courses.push(course);
    },
    addNote: function(code, note) {
      const course = this.courses.find(function(course) {
        return course.code === code;
      });
      if (course) {
        if (!course.note) {
          course.note = [];
        }
        course.note.push(note);
      }
    },
    viewNotes: function() {
      this.courses.filter(function(ele) {
        return ele.hasOwnProperty("note");
      }).forEach(function(ele) {
        console.log(`${ele.name}: ${ele.note.join("; ")}`);
      });
    },
    updateNote: function(code, note) {
      const course = this.courses.find(function(course) {
        return course.code === code;
      });
      if (course) {
        course.note = [];
        course.note.push(note);
      }
    }
  };
};


/*
addStudent: Adds a student by creating a new student and adding the student to a collection of students. The method adds a constraint that the year can only be any of the following values: '1st', '2nd', '3rd', '4th', or '5th'. Returns a student object if year is valid otherwise it logs "Invalid Year".
enrollStudent: Enrolls a student in a course.
addGrade: Adds the grade of a student for a course.
getReportCard: Logs the grades of a student for all courses. If the course has no grade, it uses "In progress" as the grade.
courseReport: Logs the grades of all students for a given course name. Only student with grades are part of the course report.
*/

// createStudent factory function omitted //

const schoolHub = {
  init: function() {
    this.students = [];
    return this;
  },
  addStudent: function(name, year) {
    const student = createStudent(name, year);
    if (!['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
      console.log("Invalid Year");
    } else {
      this.students.push(student);
      return student;
    }
  },
  enrollStudent: function(course) {
    this.addCourse(course);
  },
  addGrade: function(courseName, grade) {
    const course = this.courses.find(function(course) {
      return course.name === courseName;
    });
    if (course) {
      course.grade = grade;
    }
  },
  getReportCard: function() {
    this.courses.forEach(function(course) {
      console.log(`${course.name}: ${course.grade ? course.grade : "In Progress"}`);
    });
  },
  courseReport: function(courseName) {
    console.log(`${courseName} Grades`);
    const studentGrades = [];
    this.students.forEach(function(student) {
      const course = student.courses.find(function(course) {
        return course.name === courseName;
      });
      if (course) {
        console.log(`${student.name}: ${course.grade ? course.grade : "In Progress"}`);
        studentGrades.push(course.grade);
      }
    });
    const courseAvg = studentGrades.reduce(function(acc, ele) {
      acc += ele;
      return acc;
    }, 0) / studentGrades.length;
    console.log(`Course Avg: ${Number.isNaN(courseAvg) ? "N/A" : courseAvg}`);
  }
};

const school = Object.create(schoolHub).init();

const foo = school.addStudent('foo', '3rd');
school.enrollStudent.call(foo, { name: "Math", code: 101 });
school.enrollStudent.call(foo, { name: "Advanced Math", code: 102 });
school.enrollStudent.call(foo, { name: "Physics", code: 202 });
school.addGrade.call(foo, "Math", 95);
school.addGrade.call(foo, "Advanced Math", 90);

const bar = school.addStudent('bar', '1st');
school.enrollStudent.call(bar, { name: "Math", code: 101 });
school.addGrade.call(bar, "Math", 91);

const qux = school.addStudent('qux', '2nd');
school.enrollStudent.call(qux, { name: "Math", code: 101 });
school.enrollStudent.call(qux, { name: "Advanced Math", code: 102 });
school.addGrade.call(qux, "Math", 93);
school.addGrade.call(qux, "Advanced Math", 90);

school.getReportCard.call(foo);

school.courseReport("Math");

school.courseReport("Advanced Math");

school.courseReport("Physics");
/*
Physics Grades
foo: In Progress
Course Avg: N/A
*/

/*
const foo = createStudent('Foo', '1st');

foo.info();

foo.listCourses();

foo.addCourse({ name: "Math", code: 101 });

foo.addCourse({ name: "Advanced Math", code: 102 });

foo.listCourses();

foo.addNote(101, "Fun course");

foo.addNote(101, "Remember to study for algebra");

foo.viewNotes();

foo.addNote(102, "Difficult subject");

foo.viewNotes();

foo.updateNote(101, "Fun course");

foo.viewNotes();
*/
