const searchService = (projects, input) => {
  return projects.filter((p) => {
    if (input !== '') {
      // NAME
      if (p.name.toLowerCase().includes(input.toLowerCase())) {
        return p;
      }

      // DESCRIPTION
      if (p.description.toLowerCase().includes(input.toLowerCase())) {
        return p;
      }

      // KEYWORDS
      for (const keyword of p.keywords) {
        if (keyword.toLowerCase().includes(input.toLowerCase())) {
          return p;
        }
      }

      return null;
    }
    return p;
  });
};

export default searchService;
