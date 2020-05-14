export const isXMLValid = (input: string) => {
  let i = 0;
  let s: string[] = [];
  let l = 0;
  let b = '';
  let r = 0;

  while(i <= input.length - 1) {
    if (input[i] === '<' && input[i + 1] !== '/') {
      l++;
    } else if (input[i] === '<' && input[i + 1] === '/' ) {
      l--;
      if (l <= 0) {
        r++;
      }
      i++;
    } else if (s.length < l && input[i] === '>') {
      if(s.indexOf(b) !== -1) {
        return false;
      }
      s.push(b);
      b = '';
    } else if (s.length > l && input[i] === '>') {
      if (s.pop() !== b) {
        return false
      }
      b = '';
    } else if (input[i] === '/' && input[i + 1] === '>') {
      l--;
      if (l <= 0) {
        r++;
      }
      b = '';
      i++;
    } else if (s.length !== l) {
      b += input[i];
    } else if (l === 0 || input[i] === '>') {
      return false;
    }

    i++;
  }

  return l === 0 && s.length === 0 && r === 1;
}