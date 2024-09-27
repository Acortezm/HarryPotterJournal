# Harry Potter Journal 

Note: This project is a work in progress, and features are still being developed.

Welcome to the Harry Potter Journal project! This web application allows users to explore Harry Potter books, read chapter summaries, and journal their thoughts. It utilizes both a public API for book data and a private API that I built to manage user interactions.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Documentation](#api-documentation)
- [Getting Started](#getting-started)
- [Conclusion](#conclusion)

## Project Overview

The Harry Potter Journal project consists of two main components:
1. **Public API**: Fetches data about Harry Potter books and their chapters from an external API.
2. **Private API**: Manages user-generated content, such as journal entries related to the books and their chapters.

## Features

- Display summaries and chapters of Harry Potter books.
- Users can write and save their thoughts about each chapter.
- Retrieve all books and their chapters using the public API.
- Create and update book entries and chapters using the private API.

## Technologies Used

- **Backend**: 
  - Express.js
  - Axios
  - Body-parser
- **Frontend**: 
  - EJS (Embedded JavaScript templating)
  - Bootstrap (for styling)
- **Server**: 
  - The backend server runs on port **3000**.
  - The private API runs on port **4000**.

## API Documentation

### Private API Endpoints

- **Get all entries**: 
  - `GET /entries`
  - Returns all book entries.
  
- **Get book by ID**: 
  - `GET /entries/:id`
  - Returns the book entry with the specified ID.
  
- **Get all chapters of a book**: 
  - `GET /entries/:id/chapters`
  - Returns all chapters for the specified book ID.
  
- **Get chapter by ID**: 
  - `GET /entries/:id/chapters/:chapterId`
  - Returns the chapter with the specified chapter ID.
  
- **Add or update book entry**: 
  - `POST /`
  - Adds a new book entry or updates an existing one.
  
- **Add or update chapter entry**: 
  - `POST /entries/:id/chapters/:chapterId`
  - Adds a new chapter entry or updates an existing chapter.

### Public API Endpoints

- **Get all books**: 
  - `GET https://api.potterdb.com/v1/books`
  - Returns a list of all Harry Potter books.

- **Get chapters of a book**: 
  - `GET https://api.potterdb.com/v1/books/:id/chapters`
  - Returns a list of chapters for the specified book.

## Getting Started

To get started with the Harry Potter Journal project, follow these steps:

1. Clone the repository:
   ```bash
   git clone git@github.com:Acortezm/projects.git
   ```

2. Install the required packages:
   ```bash
   npm install
   ```

3. Start the backend server on port 3000:
   ```bash
   node server.js
   ```

4. Start the private API on port 4000:
   ```bash
   node api.js
   ```

5. Open your browser and navigate to `http://localhost:3000` to use the application.

## Conclusion

Feel free to explore the Harry Potter Journal project! I welcome any feedback or questions. Thank you for visiting my project.


### Notes:
- Replace `<your-github-link>` and `<repository-folder>` with your actual GitHub repository link and folder name.
- You can adjust any sections as needed to better reflect your project's specifics.

Let me know if you need any more changes or additional information!
