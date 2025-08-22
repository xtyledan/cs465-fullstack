# Architecture

In building the full stack application, I explored multiple approaches to frontend development. Using Express with HTML templates provided a straightforward way to render static content and server-side dynamic pages. This was useful for administrative views where SEO and quick rendering were important. JavaScript (with DOM manipulation) allowed me to add interactive features directly on the client side, enhancing user experience without requiring a page reload. The single-page application (SPA) approach provided the most modern solution, creating a smooth, app-like experience for customers by dynamically updating content through API calls instead of reloading the entire page.

On the backend, I chose a NoSQL MongoDB database because of its flexibility in handling unstructured data and its schema-less design. This made it easier to evolve the data model as the project requirements changed. Additionally, MongoDB’s document-oriented structure integrates well with JSON, making communication between the frontend and backend seamless.

# Functionality

While JavaScript is a programming language that drives interactivity in the browser, JSON (JavaScript Object Notation) is a lightweight data-interchange format. JSON is not executable like JavaScript but serves as a bridge between the frontend and backend by structuring data in a consistent, easy-to-parse format. For example, customer data retrieved from MongoDB was transmitted as JSON to the frontend, where JavaScript consumed and displayed it.

Throughout development, I refactored code to improve efficiency. For instance, I consolidated repetitive form validation logic into reusable functions and turned repeated interface patterns into reusable UI components. This improved maintainability, reduced duplication, and made it easier to add new features without rewriting existing code.

# Testing

In a full stack application, API testing is crucial to validate request and response handling. I performed unit tests for individual functions, integration tests to ensure frontend and backend communication worked correctly, and endpoint tests to confirm API reliability. For example, GET, POST, PUT, and DELETE requests were tested with various inputs to ensure consistent behavior.

Adding security introduced additional testing challenges. The admin login authentication required testing not only the correctness of login endpoints but also the security features, such as session handling, password hashing, and protection against unauthorized access. I learned that security testing must account for edge cases and malicious attempts, not just expected user behavior.

# Reflection

This course has significantly advanced my technical and professional growth. I strengthened my understanding of full stack development, gained hands-on experience in integrating frontend, backend, and databases, and developed a working application that I can showcase in my portfolio.

Key skills I’ve learned include:

- Designing and building RESTful APIs.

- Implementing secure authentication systems.

- Using MongoDB for data modeling and persistence.

- Creating reusable and maintainable frontend components.

Beyond technical skills, I also developed stronger problem-solving abilities and a deeper appreciation for iterative development. These experiences have made me a more competitive candidate for roles in web development and software engineering, as I can now demonstrate both technical proficiency and an understanding of professional best practices.
