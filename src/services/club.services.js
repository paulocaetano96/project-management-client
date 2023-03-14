//Importing the axios package to make HTTP requests.
import axios from "axios";

class ClubService {
  constructor() {
    //Creating a new class MessageService with a constructor method that initializes an api instance with a base URL for the server. If VITE_API_URL is available in the environment, it will be used as the base URL; otherwise, it will default to http://localhost:5005.
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

  //Defining a method getClub that makes a GET request to the /api/club endpoint and returns the response.
  getClub = (id) => {
    return this.api.get(`/api/club/${id}`);
  };
  //Defining a method createClub that makes a POST request to the /api/club endpoint with a request body and returns the response.
  createClub = (body) => {
    return this.api.post("/api/club", body);
  };
  //Defining a method updateClub that makes a PUT request to the /api/club/:id endpoint with a request body and the ID of the club to update, and returns the response.
  updateClub = (id, body) => {
    return this.api.put(`/api/club/${id}`, body);
  };
  //Defining a method deleteClub that makes a DELETE request to the /api/club/:id endpoint with the ID of the club to delete, and returns the response.
  deleteClub = (id) => {
    return this.api.delete(`/api/club/${id}`);
  };
}

//Creating a new instance of the MessageService class and exporting it as the default export of this module.
const clubService = new ClubService();

export default clubService;
