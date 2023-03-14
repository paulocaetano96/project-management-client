//Importing the axios package to make HTTP requests.
import axios from "axios";

class PhotoGalleryService {
  constructor() {
    //Creating a new class PhotoGalleryService with a constructor method that initializes an api instance with a base URL for the server. If VITE_API_URL is available in the environment, it will be used as the base URL; otherwise, it will default to http://localhost:5005.
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005",
    });
    //Adding an interceptor to the api instance to add a JWT token to the request headers if it exists in the browser's local storage.
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }
  //Defining a method getPhotos that makes a GET request to the /api/photos endpoint and returns the response.
  getPhotos = () => {
    return this.api.get("/api/photos");
  };
  //Defining a method createPhoto that makes a POST request to the /api/photos endpoint with a request body and returns the response.
  createPhoto = (body) => {
    return this.api.post("/api/photos", body);
  };
  //Defining a method updatePhoto that makes a PUT request to the /api/photos/:id endpoint with a request body and the ID of the photo to update, and returns the response.
  updatePhoto = (id, body) => {
    return this.api.put(`/api/photos/${id}`, body);
  };
  //Defining a method deletePhoto that makes a DELETE request to the /api/photos/:id endpoint with the ID of the photos to delete, and returns the response.
  deletePhoto = (id) => {
    return this.api.delete(`/api/photos/${id}`);
  };
}
//Creating a new instance of the PhotoGalleryService class and exporting it as the default export of this module.
const photogalleryService = new PhotoGalleryService();

export default photogalleryService;
