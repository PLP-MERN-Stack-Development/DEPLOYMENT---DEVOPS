const Bug = require('../../src/models/Bug');

describe('Bug Model', () => {
  it('should require a title', async () => {
    const bug = new Bug({ description: 'Test description' });
    await expect(bug.validate()).rejects.toThrow('Please provide a title');
  });

  it('should have a default status of "open"', () => {
    const bug = new Bug({ title: 'Test', description: 'Test' });
    expect(bug.status).toBe('open');
  });

  it('should validate title max length', async () => {
    const longTitle = 'a'.repeat(101);
    const bug = new Bug({ 
      title: longTitle,
      description: 'Test description'
    });
    
    await expect(bug.validate()).rejects.toThrow(
      'Title cannot be more than 100 characters'
    );
  });

  it('should validate status enum values', async () => {
    const bug = new Bug({ 
      title: 'Test', 
      description: 'Test',
      status: 'invalid-status'
    });
    
    await expect(bug.validate()).rejects.toThrow(
      '`invalid-status` is not a valid enum value'
    );
  });

  it('should update the updatedAt field on save', async () => {
    const bug = new Bug({ title: 'Test', description: 'Test' });
    await bug.save();
    
    const originalUpdatedAt = bug.updatedAt;
    
    // Wait for 1 second to ensure timestamp changes
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    bug.title = 'Updated Title';
    await bug.save();
    
    expect(bug.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime());
  });
});