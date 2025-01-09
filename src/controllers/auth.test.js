const { login } = require('./auth');
const tokenUtil = require('../util/token');
const logger = require('../services/logger');

// Mock dependencies
jest.mock('../util/token');
jest.mock('../services/logger');

describe('Auth Controller', () => {
	let req;
	let res;

	beforeEach(() => {
		// Reset mocks
		jest.clearAllMocks();

		// Mock response object
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};

		// Mock request object
		req = {
			body: {}
		};

		// Mock process.env
		process.env.ROOT_PASSWORD = 'test123';
	});

	test('should return 400 when username is missing', () => {
		req.body = { password: 'test123' };

		login(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			message: 'Username and password are required'
		});
		expect(logger.error).toHaveBeenCalled();
	});

	test('should return 401 for invalid credentials', () => {
		req.body = {
			username: 'wronguser',
			password: 'wrongpass'
		};

		login(req, res);

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({
			message: 'Invalid credentials'
		});
		expect(logger.error).toHaveBeenCalled();
	});

	test('should return token for valid credentials', () => {
		const mockToken = 'mock-jwt-token';
		tokenUtil.newtoken.mockReturnValue(mockToken);

		req.body = {
			username: 'root',
			password: 'test123'
		};

		login(req, res);

		expect(tokenUtil.newtoken).toHaveBeenCalledWith({
			username: 'root',
			role: 'admin'
		});
		expect(res.json).toHaveBeenCalledWith({ token: mockToken });
	});
});