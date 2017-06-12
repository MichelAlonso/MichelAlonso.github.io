import { GitioPage } from './app.po';

describe('gitio App', () => {
  let page: GitioPage;

  beforeEach(() => {
    page = new GitioPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
