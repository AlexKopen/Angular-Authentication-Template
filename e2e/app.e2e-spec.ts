import { AngularAuthenticationTemplatePage } from './app.po';

describe('angular-authentication-template App', () => {
  let page: AngularAuthenticationTemplatePage;

  beforeEach(() => {
    page = new AngularAuthenticationTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
