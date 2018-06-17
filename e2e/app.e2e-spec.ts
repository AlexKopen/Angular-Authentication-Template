import { AngularAuth0AsidePage } from './app.po';

describe('angular-authentication-template App', () => {
  let page: AngularAuth0AsidePage;

  beforeEach(() => {
    page = new AngularAuth0AsidePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
