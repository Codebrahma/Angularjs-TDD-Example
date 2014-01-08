exports.config={
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs:['js/test/e2e/*.js'],
  capabilities: {
    'browserName': 'firefox'
  }
};
