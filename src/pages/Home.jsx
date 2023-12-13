import React from "react";
import DragAndDropList from "../components/ReuseTable";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <br />
      <DragAndDropList />
    </div>
  );
};

export default Home;
/**
 * Requirements:




Display lawyers in a table format on the website. 
Each row represents a lawyer, with columns displaying relevant information.
Implement filtering functionality for users to search lawyers by attributes like name, speciality, or firms. Enable dynamic table filtering based on user queries.
Use a drag and drop (DND) package (e.g., React DnD or React Beautiful DnD) to allow users to rearrange the table order by dragging and dropping rows.
Create a booking system where users can schedule appointments with lawyers. Use Redux and Redux Thunk for state management and asynchronous actions. Block selected time slots to prevent double booking.
Design a clean and professional UI/UX. Use a UI library (e.g., Material-UI, Tailwind CSS, Bootstrap) or CSS utilities for visual appeal and responsiveness.
Ensure well-structured, readable, and maintainable code. Follow React development best practices to demonstrate coding proficiency.
Deliverables:

Source code of the React application, properly structured and organized.
Pushed to a public GitHub repo.
Optionally, deploy the application online using platforms like Netlify, Vercel, or GitHub Pages.
Evaluation Criteria:

Correctness: Assess if the application functions as expected, allowing users to view, filter, rearrange lawyers, and book appointments successfully.
Code Quality: Evaluate code structure, readability, and adherence to React and Redux best practices.
UI/UX Design: Consider visual appeal, user-friendliness, and attention to UI/UX details for a seamless user experience.
Extensibility: Check if the codebase is designed to be easily extendable for future changes or additions.
Extra Features: Evaluate the use of additional libraries and implementation of features enhancing UI/UX.
Submission:
Please submit your assignment by providing the GitHub repository link or a zip file containing your code by {NowDay->plus_2}.
*************************



Set up a JSON Server to create a fake backend API that serves lawyer data. The lawyer data should include properties such as id, name, speciality, firms, address, phone number, and available time. You can generate sample data using JSON Server or create your own JSON file.
Display the list of lawyers in a table format on the website. Each row in the table should represent a lawyer, and columns should display their relevant information.
Implement filtering functionality that allows users to search for lawyers based on their attributes such as name, speciality, or firms. Users should be able to dynamically filter the table based on their search queries.
Utilize a drag and drop (DND) package of your choice (e.g., React DnD or React Beautiful DnD) to enable users to rearrange the order of lawyers in the table by dragging and dropping rows.
Create a booking system where users can schedule appointments with available lawyers. When a user selects an available time slot, it should be blocked for other users to prevent double booking. Use Redux and Redux Thunk for state management and asynchronous actions.
Design the UI/UX of the website with a clean and professional look. You can use a UI library (e.g., Material-UI, Tailwind CSS, Bootstrap) or CSS utilities to enhance the visual appeal and responsiveness of the website.
Ensure that the code is well-structured, readable, and maintainable. Follow best practices for React development and demonstrate your proficiency in writing clean code.


 */
