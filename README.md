# Todo List App (Front-End)

This is the front-end of the Todo List application built with Next.js, TypeScript, and Tailwind CSS.

## Requirements
- Node.js >= 18.x
- npm >= 8.x

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine
`cd todoapp`

### 2. Install Dependencies

Run the following command to install the required dependencies:
`npm install`

### 3. Set Up Environment Variables

#### 1. Copy the .env.example file to .env:
To configure environment variables, you need to copy the example environment file and rename it to .env:
`cp .env.example .env`

#### 2. Update the Backend URL:
In the .env file, update the NEXT_PUBLIC_API_BASE_URL with the URL of your deployed back-end API (e.g., Heroku or local back-end URL):
NEXT_PUBLIC_API_BASE_URL=http://localhost
Replace http://localhost with the actual URL of your Express.js back-end API.

### 4. Run the Development Server

Start the development server with the following command:
npm run dev

This will start the app at http://localhost:3000.

## File Structure
- pages: Contains the page components for the app.
- components: Contains reusable components like TaskCard, Form, etc.
- styles: Contains global styles and Tailwind CSS configuration.

## Troubleshooting
- Environment Variables: Ensure that the .env file is correctly configured, especially the NEXT_PUBLIC_API_BASE_URL pointing to the correct back-end URL.

## Contributing

Feel free to open issues or submit pull requests for improvements and bug fixes.
