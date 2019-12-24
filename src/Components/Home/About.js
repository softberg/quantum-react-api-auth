import React from "react";
const About = () => {
  return (
    <div className="About">
      <p>
        Quantum is a free, open-source PHP web framework, specially designed to
        develop very fast web applications with modular structure. With Quantum
        it's easy to start any kind of projet, from regular websites to complex
        API based projects, at the same time keep the code clean, organized
        through all the development process
      </p>

      <h1>Installation</h1>
      
      <h3>Create project</h3>
      <code>
        > composer create-project quantum/project {`{ project name }`}
      </code>

      <h3>Run PHP server</h3>
      <code>> php -S localhost:8080</code>
    </div>
  );
};

export default About;
