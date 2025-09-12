# MoonFlix - Movie & TV Series Streaming Platform

## Project Description
MoonFlix is an interactive movie and TV series streaming platform that allows users to explore and watch the latest films and shows. The application is built with React and offers an attractive, user-friendly interface.

## Key Features
- **Browse Movies & TV Shows**
- **Detailed Information Pages** for each title
- **Advanced Search System** to find your favorite content
- **Interactive UI** with responsive design
- **Secure Authentication** using Clerk
- **Multiple Categories** for easy content discovery

## Installation & Setup

### Prerequisites
- Node.js (version 14 or later)
- npm (comes with Node.js) or Yarn

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/MohamedSamirMohamed/MoonFlix.git
   ```
2. Navigate to the project directory:
   ```bash
   cd MoonFlix/app5
   ```
3. Install the required dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Usage
1. Open your browser and go to `http://localhost:3000`
2. Browse available movies and TV shows
3. Use the search bar to find specific content
4. Click on any item to view detailed information

## Project Structure
```
src/
├── components/         # Reusable React components
│   ├── DetailsContxt/  # Content details context
│   ├── Footer/         # Page footer
│   ├── Layout/         # Application layout
│   ├── Navbar/         # Navigation bar
│   └── ...
├── context/           # React contexts
├── assets/            # Static files (images, fonts, etc.)
└── App.js             # Main application entry point
```

## Technologies Used
- **Framework**: React 19
- **Styling**: Tailwind CSS, Bootstrap 5
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Authentication**: Clerk
- **API Requests**: Axios
- **Icons**: React Icons, Lucide Icons
- **Testing**: React Testing Library, Jest

## Contributing
1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature/feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add: new feature'
   ```
4. Push your changes:
   ```bash
   git push origin feature/feature-name
   ```
5. Open a Pull Request

## License

Developed by [Live Demo](https://mohamedsamirmohamed.github.io/MoonFlix/)
