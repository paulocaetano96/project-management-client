import axios from 'axios';

class MessageService {
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

	getMessages = () => {
		return this.api.get('/api/messages');
	};

	createMessage = (body) => {
		return this.api.post('/api/messages', body);
	};

/*     getSingleProject = (id) => {
        return this.api.get(`/api/projects/${id}`, id)
    } */


}

const messageService = new MessageService();

export default messageService;
