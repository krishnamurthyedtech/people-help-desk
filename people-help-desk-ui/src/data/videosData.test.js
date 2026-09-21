import { videosData } from './videosData';

describe('videosData validation', () => {
  test('contains exactly 33 videos', () => {
    expect(videosData).toHaveLength(33);
  });

  test('every video has id, src, title, category, and a detailed description', () => {
    const validCategories = ['LAW', 'FINANCE', 'EDUCATION', 'LAND', 'HEALTH'];
    
    videosData.forEach((video, index) => {
      expect(video.id).toBeDefined();
      expect(video.id).toBe(index + 1);
      expect(video.src).toMatch(/^https:\/\/www\.youtube\.com\/embed\//);
      expect(typeof video.title).toBe('string');
      expect(video.title.trim().length).toBeGreaterThan(5);
      expect(validCategories).toContain(video.category);
      expect(typeof video.description).toBe('string');
      expect(video.description.trim().length).toBeGreaterThan(20);
    });
  });

  test('covers all 5 categories', () => {
    const categories = new Set(videosData.map(v => v.category));
    expect(categories.has('LAW')).toBe(true);
    expect(categories.has('FINANCE')).toBe(true);
    expect(categories.has('EDUCATION')).toBe(true);
    expect(categories.has('LAND')).toBe(true);
    expect(categories.has('HEALTH')).toBe(true);
  });
});
