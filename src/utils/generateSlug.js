const generateSlug = (str) => str.replace(/[^a-zA-Z0-9]/g, '-');

export default generateSlug;
