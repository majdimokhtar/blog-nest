// import { BlogPost } from './blog-post.entity';

// describe('BlogPost Entity', () => {
//   it('should update the content and update the updatedAt timestamp', () => {
//     // Arrange
//     const initialDate = new Date('2024-10-09T21:41:05.206Z');
//     const blogPost = new BlogPost(
//       '1',
//       'Test Title',
//       'Initial Content',
//       'author123',
//       initialDate,
//       initialDate,
//     );

//     // Add a small delay to ensure the timestamps are different
//     jest.useFakeTimers();
//     jest.setSystemTime(new Date('2024-10-09T21:41:06.206Z')); // Set time 1 second later

//     const oldUpdatedAt = blogPost.updatedAt;

//     // Act
//     blogPost.updateContent('Updated Content');

//     // Assert
//     expect(blogPost.content).toEqual('Updated Content');
//     expect(blogPost.updatedAt.getTime()).toBeGreaterThan(
//       oldUpdatedAt.getTime(),
//     );

//     // Cleanup
//     jest.useRealTimers();
//   });
// });

// import { BlogPost } from './blog-post.entity';

// describe('BlogPost Entity', () => {
//   it('should create a blog post with given values', () => {
//     const blogPost = new BlogPost(
//       '1',
//       'Test Title',
//       'Test Content',
//       'author123',
//       new Date(),
//       new Date(),
//     );

//     expect(blogPost.id).toEqual('1');
//     expect(blogPost.title).toEqual('Test Title');
//     expect(blogPost.content).toEqual('Test Content');
//     expect(blogPost.authorId).toEqual('author123');
//   });

//   it('should update the content and updatedAt timestamp', async () => {
//     const createdAt = new Date();
//     const blogPost = new BlogPost(
//       '1',
//       'Test Title',
//       'Test Content',
//       'author123',
//       createdAt,
//       createdAt,
//     );

//     const oldUpdatedAt = blogPost.updatedAt;

//     // Wait for a small amount of time to ensure timestamp difference
//     await new Promise((resolve) => setTimeout(resolve, 1));

//     blogPost.updateContent('Updated Content');

//     expect(blogPost.content).toEqual('Updated Content');
//     expect(blogPost.updatedAt.getTime()).toBeGreaterThan(
//       oldUpdatedAt.getTime(),
//     );
//   });
// });
