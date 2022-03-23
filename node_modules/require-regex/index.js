module.exports = () => {
  return /(?:(?:var|const|let)\s*(.*?)\s*=\s*)?require\s*\(\s*['"]([^'"]+)['"](?:, ['"]([^'"]+)['"])?\s*\);?/;
};
