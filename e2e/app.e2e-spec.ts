import { NgLeaseCalculatorPage } from './app.po';

describe('ng-lease-calculator App', function() {
  let page: NgLeaseCalculatorPage;

  beforeEach(() => {
    page = new NgLeaseCalculatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
