# Movie and Show Tracker App

A simple React Native app built with Expo to track movies and shows, manage watch lists, and explore detailed information.

---

## **Features**

### **Home Screen**
- **Display Lists**: Shows all movies and shows fetched from the API.  
- **Search**: Search movies or shows by name.  
- **Sort Alphabetically**: Sort the displayed list in alphabetical order.  
- **Filter by Type**: Filter the list to show either movies or shows only.  
- **Hamburger Menu**: Displays a message when clicked.  
- **Profile Menu**: Opens a placeholder profile screen when clicked.  
- **My List Tab**: Navigates to "My List" screen.

### **My List Screen**
- **Categorized Lists**: Displays a user’s movies/shows under "Watched" and "To Watch" categories.  
- **Horizontal Scroll**: A scrollable list for quick navigation.  

### **Movie/Show Details Screen**
- **Detailed View**: Displays the title, type, and description of the selected movie/show.  
- **Categorization Button**: Adds the movie/show to either "Watched" or "To Watch" category.

### **Bonus Features**
- **Pull-to-Refresh**: Refresh the Home Screen data.

---

## **API Endpoints**
- **Add Movie to Watch List**: Add movies to "Watched" or "To Watch".  
- **Get My List**: Retrieve all movies under "Watched" or "To Watch".  
- **Get Movie Details**: Fetch detailed information of a specific movie.  
- **Get Movies List**: Retrieve a complete list of movies.

---

## **How to Run**
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   expo start
   ```
3. Build APK (if needed):
   ```bash
   expo build:android
   ```
