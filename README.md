# FreshLens: A Fresh Persepective On Meal Planning

## About

This platform uses image recognition and AI-powered recipe generation to help users make healthier meals with the ingredients they already have.

Users can upload images of food or take pictures directly through the application, which then identifies the ingredients present and generates personalized healthy recipe suggestions. The goal is to reduce food waste, simplify meal planning, and make healthy eating more accessible and convenient.

## Access the Live Application

Visit the live FreshLens web app directly at:

[https://freshlens.azurewebsites.net](https://freshlens.azurewebsites.net)
## Instructions for Setup and Running

### Prerequisites

Before getting started, ensure you have the following installed:

*   **Node.js:** (Version 22.0.0 or higher recommended) - [https://nodejs.org/](https://nodejs.org/)
*   **npm (Node Package Manager) or yarn:** (Comes with Node.js)
*   **Git:** (If you want to clone the repository) - [https://git-scm.com/](https://git-scm.com/)
*   **Postman (Optional):** For testing API endpoints - [https://www.postman.com/](https://www.postman.com/)

### Installation (For Local Development)

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/evan-tome/FreshLens.git
    cd FreshLens
    ```

2.  **Install Dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Environment Variables:**

    *   Create a `.env` file in the root directory of your project.
    *   Add the following environment variables to the `.env` file:

        ```
        REACT_APP_HF_TOKEN=your_hugging_face_access_token
        REACT_APP_LOGMEAL_API_KEY=your_logmeal_access_token
        ```

### Running the Application (For Local Development)

**Development Server:**

```bash
cd FreshLens/paper-trail
npm start
node server.js
```
