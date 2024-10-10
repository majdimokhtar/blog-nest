// import { BlogPost } from '../../domain/blog-post.entity';
// import { InMemoryBlogPostRepository } from './in-memory-blog-post.repository';

// describe('InMemoryBlogPostRepository', () => {
//   let repository: InMemoryBlogPostRepository;

//   beforeEach(() => {
//     repository = new InMemoryBlogPostRepository();
//   });

//   it('should save a blog post', () => {
//     const blogPost = new BlogPost(
//       '1', // ID
//       'Test Title', // Title
//       'Test Content', // Content
//       // Only include the arguments your BlogPost constructor actually expects
//     );
//     repository.save(blogPost);

//     const foundPost = repository.findById('1');
//     expect(foundPost).toEqual(blogPost);
//   });

//   it('should find a blog post by ID', () => {
//     const blogPost1 = new BlogPost('1', 'Title 1', 'Content 1');
//     const blogPost2 = new BlogPost('2', 'Title 2', 'Content 2');
//     repository.save(blogPost1);
//     repository.save(blogPost2);

//     const foundPost = repository.findById('2');
//     expect(foundPost).toEqual(blogPost2);
//   });

//   it('should return all saved blog posts', () => {
//     const blogPost1 = new BlogPost('1', 'Title 1', 'Content 1');
//     const blogPost2 = new BlogPost('2', 'Title 2', 'Content 2');
//     repository.save(blogPost1);
//     repository.save(blogPost2);

//     const allPosts = repository.findAll();
//     expect(allPosts).toEqual([blogPost1, blogPost2]);
//   });
// });

// import { BlogPost } from '../../domain/blog-post.entity';
// import { InMemoryBlogPostRepository } from './in-memory-blog-post.repository';

// describe('InMemoryBlogPostRepository', () => {
//   let repository: InMemoryBlogPostRepository;

//   beforeEach(() => {
//     repository = new InMemoryBlogPostRepository();
//   });

//   it('should save a blog post', async () => {
//     const blogPost = new BlogPost(
//       '1', // ID
//       'Test Title', // Title
//       'Test Content', // Content
//     );
//     await repository.save(blogPost); // Await save if it is asynchronous

//     const foundPost = await repository.findById('1'); // Await findById
//     expect(foundPost).toEqual(blogPost);
//   });

//   it('should find a blog post by ID', async () => {
//     const blogPost1 = new BlogPost('1', 'Title 1', 'Content 1');
//     const blogPost2 = new BlogPost('2', 'Title 2', 'Content 2');
//     await repository.save(blogPost1);
//     await repository.save(blogPost2);

//     const foundPost = await repository.findById('2'); // Await findById
//     expect(foundPost).toEqual(blogPost2);
//   });

//   it('should return all saved blog posts', async () => {
//     const blogPost1 = new BlogPost('1', 'Title 1', 'Content 1');
//     const blogPost2 = new BlogPost('2', 'Title 2', 'Content 2');
//     await repository.save(blogPost1);
//     await repository.save(blogPost2);

//     const allPosts = await repository.findAll(); // Await findAll
//     expect(allPosts).toEqual([blogPost1, blogPost2]);
//   });
// });

import { BlogPost } from '../../domain/blog-post.entity';
import { InMemoryBlogPostRepository } from './in-memory-blog-post.repository';

describe('InMemoryBlogPostRepository', () => {
  let repository: InMemoryBlogPostRepository;

  beforeEach(() => {
    repository = new InMemoryBlogPostRepository();
  });

  it('should save a blog post', async () => {
    const blogPost = new BlogPost(
      '1',
      'Test Title',
      'Test Content',
      'Test Author',
    );

    await repository.save(blogPost); // TypeORM will generate the id

    const foundPost = await repository.findById(blogPost.id); // Use the generated id
    expect(foundPost).toEqual(blogPost);
  });

  it('should find a blog post by ID', async () => {
    const blogPost1 = new BlogPost('1', 'Title 1', 'Content 1', 'Author 1');
    const blogPost2 = new BlogPost('2', 'Title 2', 'Content 2', 'Author 2');

    await repository.save(blogPost1);
    await repository.save(blogPost2);

    const foundPost = await repository.findById(blogPost2.id); // Use generated id
    expect(foundPost).toEqual(blogPost2);
  });

  it('should return all saved blog posts', async () => {
    const blogPost1 = new BlogPost('1', 'Title 1', 'Content 1', 'Author 1');
    const blogPost2 = new BlogPost('2', 'Title 2', 'Content 2', 'Author 2');

    await repository.save(blogPost1);
    await repository.save(blogPost2);

    const allPosts = await repository.findAll();
    expect(allPosts).toEqual([blogPost1, blogPost2]);
  });
});
