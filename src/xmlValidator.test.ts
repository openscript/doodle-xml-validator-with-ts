import { isXMLValid } from './xmlValidator';

describe('xmlValidator', () => {
  it('should check for correct nesting', () => {
    expect(isXMLValid('<root><child>Joho</child></root>')).toBe(true);
    expect(isXMLValid('<root><child><grand-child></child></grand-child></root>')).toBe(false);
    expect(isXMLValid('<root><child></foreigner></root>')).toBe(false);
  })
  it('should check for multiple root elements', () => {
    expect(isXMLValid('<root></root><another-root></another-root>')).toBe(false);
  });
  it('should allow these', () => {
    expect(isXMLValid('<tag></tag>')).toBe(true);
    expect(isXMLValid('<tag> some data </tag>')).toBe(true);
    expect(isXMLValid('<rootTag><anotherTag>text text text</anotherTag></rootTag>')).toBe(true);
    expect(isXMLValid('<aTag>data<anotherTag>text text text</anotherTag></aTag>')).toBe(true);
    expect(isXMLValid('<tag> <emptyTag/> </tag>')).toBe(true);
  });
  it('should forbid these', () => {
    expect(isXMLValid('abc')).toBe(false);
    expect(isXMLValid('abc<tag></tag>')).toBe(false);
    expect(isXMLValid('<tag>abc</tag>abc')).toBe(false);
    expect(isXMLValid('<>')).toBe(false);
    expect(isXMLValid('</>')).toBe(false);
    expect(isXMLValid('<tag>')).toBe(false);
    expect(isXMLValid('<tag>data</Tag>')).toBe(false);
    expect(isXMLValid('<tag></tag>data<tag></tag>;')).toBe(false);
    expect(isXMLValid('<tag<>data</tag>;')).toBe(false);
    expect(isXMLValid('<tag></ta/g>;')).toBe(false);
    expect(isXMLValid('</tag>')).toBe(false);
    expect(isXMLValid('<tag><tag></tag></tag>')).toBe(false);
    expect(isXMLValid('<tags> <something> </something> <tags> </aTag> </aTag>')).toBe(false);
    expect(isXMLValid('<tag></tag')).toBe(false);
    expect(isXMLValid('<tag></tag>>')).toBe(false);
    expect(isXMLValid('<tag1> </tag1> <tag2></tag2>')).toBe(false);
    expect(isXMLValid('null')).toBe(false);
    expect(isXMLValid('')).toBe(false);
    expect(isXMLValid('<tag> text>text </tag>')).toBe(false);
  });
});