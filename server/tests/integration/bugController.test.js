const request = require('supertest');
const app = require('../../src/server');
const Bug = require('../../src/models/Bug');

describe('Bug Controller Integration Tests', () => {
  describe('GET /api/bugs', () => {
    it('should return an empty array when no bugs exist', async () => {
      const res = await request(app).get('/api/bugs');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('should return all bugs', async () => {
      // Create test bugs
      await Bug.create([
        { title: 'Bug 1', description: 'Description 1' },
        { title: 'Bug 2', description: 'Description 2' }
      ]);

      const res = await request(app).get('/api/bugs');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].title).toBe('Bug 1');
      expect(res.body[1].title).toBe('Bug 2');
    });
  });

  describe('POST /api/bugs', () => {
    it('should create a new bug', async () => {
      const newBug = {
        title: 'New Bug',
        description: 'New bug description',
        priority: 'high'
      };

      const res = await request(app)
        .post('/api/bugs')
        .send(newBug);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.title).toBe(newBug.title);
      expect(res.body.description).toBe(newBug.description);
      expect(res.body.priority).toBe(newBug.priority);
      expect(res.body.status).toBe('open'); // Default status
    });

    it('should return 400 for invalid data', async () => {
      const invalidBug = { description: 'Missing title' };
      
      const res = await request(app)
        .post('/api/bugs')
        .send(invalidBug);

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Validation Error');
      expect(res.body.messages).toContain('Please provide a title');
    });
  });

  describe('GET /api/bugs/:id', () => {
    it('should return a bug by id', async () => {
      const bug = await Bug.create({
        title: 'Test Bug',
        description: 'Test Description'
      });

      const res = await request(app).get(`/api/bugs/${bug._id}`);
      expect(res.status).toBe(200);
      expect(res.body._id).toBe(bug._id.toString());
      expect(res.body.title).toBe('Test Bug');
    });

    it('should return 404 for non-existent id', async () => {
      const nonExistentId = '5f8d0d55b54764421b7156da'; // Valid but non-existent ObjectId
      
      const res = await request(app).get(`/api/bugs/${nonExistentId}`);
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Not Found');
    });

    it('should return 400 for invalid id format', async () => {
      const invalidId = 'invalid-id';
      
      const res = await request(app).get(`/api/bugs/${invalidId}`);
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Invalid ID format');
    });
  });

  describe('PUT /api/bugs/:id', () => {
    it('should update a bug', async () => {
      const bug = await Bug.create({
        title: 'Original Bug',
        description: 'Original Description',
        status: 'open'
      });

      const updates = {
        title: 'Updated Bug',
        status: 'in-progress'
      };

      const res = await request(app)
        .put(`/api/bugs/${bug._id}`)
        .send(updates);

      expect(res.status).toBe(200);
      expect(res.body.title).toBe('Updated Bug');
      expect(res.body.status).toBe('in-progress');
      expect(res.body.description).toBe('Original Description'); // Should remain unchanged
    });

    it('should return 404 for non-existent id', async () => {
      const nonExistentId = '5f8d0d55b54764421b7156da';
      const updates = { status: 'in-progress' };
      
      const res = await request(app)
        .put(`/api/bugs/${nonExistentId}`)
        .send(updates);

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/bugs/:id', () => {
    it('should delete a bug', async () => {
      const bug = await Bug.create({
        title: 'Bug to delete',
        description: 'Will be deleted'
      });

      const res = await request(app).delete(`/api/bugs/${bug._id}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Bug deleted successfully');

      // Verify bug is actually deleted
      const deletedBug = await Bug.findById(bug._id);
      expect(deletedBug).toBeNull();
    });

    it('should return 404 for non-existent id', async () => {
      const nonExistentId = '5f8d0d55b54764421b7156da';
      
      const res = await request(app).delete(`/api/bugs/${nonExistentId}`);
      expect(res.status).toBe(404);
    });
  });
});