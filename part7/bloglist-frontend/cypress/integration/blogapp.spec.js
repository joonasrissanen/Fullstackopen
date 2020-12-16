

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    const user = {
      name: 'Test user',
      username: 'testuser',
      password: 'salainen'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('Log in to application');
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click();
      cy.get('#username').type('testuser');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();

      cy.contains('blogs');
    });

    it('fails with wrong credentials', function() {
      cy.contains('log in').click();
      cy.get('#username').type('testuser');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.contains('Wrong username or password');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'salainen' });
    });

    it('A blog can be created', function() {
      cy.contains('new blog').click();
      cy.get('#title').type('New blog');
      cy.get('#author').type('Test author');
      cy.get('#url').type('www.foo.bar');
      cy.get('#blog-submit').click();

      cy.get('#blog-list', { timeout: 3000 }).should('contain', 'New blog Test author');
    });
    it('a user can like blogs', function() {
      cy.contains('new blog').click();
      cy.get('#title').type('New blog');
      cy.get('#author').type('Test author');
      cy.get('#url').type('www.foo.bar');
      cy.get('#blog-submit').click();
      cy.contains('view').click();
      cy.contains('likes 0');
      cy.contains('like').click();
      cy.get('#blog-list', { timeout: 3000 }).should('contain', 'likes 1');
    });
    it('a user can delete blogs', function() {
      cy.addBlog({ title: 'Blog 1', author: 'Author 1', url: 'www.foo.bar' });
      cy.contains('view').click();

      cy.contains('remove').click();
      cy.get('#blog-list', { timeout: 3000 }).should('not.contain', 'New blog');
    });
    it('added blogs are sorted likes', function() {
      cy.addBlog({ title: 'Blog 1', author: 'Author 1', url: 'www.foo.bar' });
      cy.addBlog({ title: 'Blog 2', author: 'Author 2', url: 'www.foo2.bar' });
      cy.get('#blog-list>div', { timeout: 3000 }).eq(1).contains('view').click();
      cy.get('#blog-list>div', { timeout: 3000 }).eq(1).contains('like').click();
      cy.wait(1000);
      cy.get('#blog-list>div').eq(0).should('contain', 'Blog 2 Author 2');
    });
  });
});