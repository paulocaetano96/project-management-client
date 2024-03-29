import axios from 'axios';
import moment from 'moment';

class EventService {
	constructor() {
		this.api = axios.create({
			baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005',
		});
		this.api.interceptors.request.use((config) => {
			const storedToken = localStorage.getItem('authToken');
			if (storedToken) {
				config.headers = { Authorization: `Bearer ${storedToken}` };
			}

			return config;
		});
	}

	getEvents = () => {
		return this.api.get('/api/events');
	};

	createEvent = (body) => {
		return this.api.post('/api/events', body);
	};

    getSingleEvent = (id) => {
        return this.api.get(`/api/projects/${id}`, id)
    }

	editEvent = (body) => {
		return this.api.put('/api/events', body)
	}

	deleteEvent = (id) => {
		return this.api.delete(`/api/events/${id}`)
	}

}

const eventService = new EventService();

export default eventService;
