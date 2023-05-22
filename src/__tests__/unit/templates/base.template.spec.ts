import {expect} from 'chai';
import {TestTemplate} from '../../fixtures/templates/test.template';

describe('Unit Testing - Templates', () => {
  const testTemplate = new TestTemplate();

  it('Has a subject', () => {
    expect(testTemplate.subject).to.be.equal('Test');
  });

  it('Build a html template', () => {
    const template = testTemplate.buildTemplate();

    const templateSections = [
      '<!DOCTYPE html>',
      '<html lang="es">',
      '<head>',
      '<title>Test</title>',
      '<meta charset="utf-8">',
      '<style>',
      '.html {}',
      '</style>',
      '</head>',
      '<body>',
      '<p>Hello world<p>',
      '</body>',
      '</html>',
    ];

    expect(template.length).to.be.greaterThan(0);
    expect(template).to.be.equal(templateSections.join(''));
  });
});
