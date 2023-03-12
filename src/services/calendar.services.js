import axios from 'axios';
import moment from 'moment';

class CalendarService {
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

    /* '?start='+moment(data.start).toISOString()+'&end='+moment(data.end).toISOString() */

	createEvent = (body) => {
		return this.api.post('/api/events', body);
	};

/*     getSingleProject = (id) => {
        return this.api.get(`/api/projects/${id}`, id)
    } */


}

const calendarService = new CalendarService();

export default calendarService;
