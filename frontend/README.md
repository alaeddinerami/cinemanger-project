# Cinemanager Front

Cinemanager Front is a web application developed using React for managing cinema operations. It provides a user-friendly interface for browsing movies, managing screenings, and user interactions.

## Features

### 1. Movie Browsing
- Users can browse through a list of available movies.
- Movies can be filtered and sorted by genre, release date,
- Each movie entry provides essential information such as title, description, release date, and average rating.

### 2. Movie Details
- Users can click on a movie to view detailed information, including:
  - Cast and crew information.
  - Reviews and ratings.
  - Trailers and promotional images.


### 4. User Accounts
- Users can create accounts to  manage bookings.

### 6. Filter Functionality
- Users can search for movies by Genre for quick access.

## Getting Started with Docker

To run the application using Docker, follow these steps:

### 1. Build the Docker Image

Navigate to the root of your project directory where the `Dockerfile` is located and run the following command:

```bash
docker build -t cinemanager .
```
### After successfully building the image, run the container using the command:
```bash
docker run -p 3000:80 cinemanager
