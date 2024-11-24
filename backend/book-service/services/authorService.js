
exports.createAuthor = (authorData) => {
  return new Promise((resolve, reject) => {
    client.CreateAuthor(authorData, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    });
  });
};

