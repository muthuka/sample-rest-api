const { create, getAll, get, update, remove } = require('./users');
const { v4: uuidv4 } = require('uuid');

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'test-uuid')
}));

describe('Users Controller', () => {
    let req;
    let res;

    beforeEach(() => {
        // Clear users object by re-requiring the file
        jest.resetModules();
        // Reset response mock
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        // Reset request mock
        req = {
            body: {},
            params: {}
        };
    });

    describe('create()', () => {
        test('creates new user successfully', () => {
            req.body = { email: 'test@test.com', name: 'Test User' };

            create(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith('User created');
        });

        test('rejects duplicate user', () => {
            req.body = { email: 'test@test.com', name: 'Test User' };
            create(req, res);
            create(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('User already exists');
        });
    });

    describe('getAll()', () => {
        test('returns all users', () => {
            req.body = { email: 'test@test.com', name: 'Test User' };
            create(req, res);

            getAll(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                'test@test.com': expect.any(Object)
            }));
        });
    });

    describe('get()', () => {
        test('returns specific user', () => {
            req.body = { email: 'test@test.com', name: 'Test User' };
            create(req, res);

            req.params.id = 'test-uuid';
            get(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
                email: 'test@test.com'
            }));
        });

        test('returns 404 for non-existent user', () => {
            req.params.id = 'non-existent';
            get(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('User not found');
        });
    });

    describe('update()', () => {
        test('updates existing user', () => {
            // Create user first
            req.body = { email: 'test@test.com', name: 'Test User' };
            create(req, res);

            // Update user
            req.params.id = 'test-uuid';
            req.body = { email: 'test@test.com', name: 'Updated Name' };
            update(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith('User updated');
        });

        test('returns 404 for non-existent user update', () => {
            req.params.id = 'non-existent';
            req.body = { email: 'test@test.com', name: 'Test User' };
            update(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('User not found');
        });
    });

    describe('remove()', () => {
        test('removes existing user', () => {
            // Create user first
            req.body = { email: 'test@test.com', name: 'Test User' };
            create(req, res);

            // Remove user
            req.params.id = 'test-uuid';
            remove(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith('User removed');
        });

        test('returns 404 for non-existent user removal', () => {
            req.params.id = 'non-existent';
            remove(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith('User not found');
        });
    });
});