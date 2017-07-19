import { TestsDemoPage } from './app.po';

describe('tests-demo App', () => {
  let page: TestsDemoPage;

  beforeEach(() => {
    page = new TestsDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
