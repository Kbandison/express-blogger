const validateBlogData = (blogData) => {
  if (
    blogData.title === undefined ||
    typeof blogData.title !== "string" ||
    blogData.title.length > 40
  ) {
    return {
      isValid: false,
      message:
        "Title is required and needs to be a string that's less than 40 characters",
    };
  }

  if (
    blogData.text === undefined ||
    typeof blogData.text !== "string" ||
    blogData.text.length > 40
  ) {
    return {
      isValid: false,
      message:
        "Text is required and needs to be a string that's less than 40 characters",
    };
  }

  if (blogData.author === undefined || typeof blogData.author !== "string") {
    return {
      isValid: false,
      message: "Author is required and needs to be a string",
    };
  }

  if (blogData.category === undefined || !Array.isArray(blogData.category)) {
    return {
      isValid: false,
      message: "Category is required and needs to be a string",
    };
  }

  return {
    isValid: true,
  };
};

module.exports = { validateBlogData };
