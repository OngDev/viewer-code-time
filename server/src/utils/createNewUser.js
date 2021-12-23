const axios = require("axios");

const getReposFromGithub = async (nickname) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${nickname}/repos`
    );

    const newRepos = response.data.map((repo) => {
      return {
        name: repo.name,
        link: repo.html_url,
        description: repo.description,
      };
    });

    return newRepos;
  } catch (error) {
    console.log(error);
    return;
  }
};

const createNewUser = async (nickname) => {
  try {
    const repos = await getReposFromGithub(nickname);

    const user = {
      nickname,
      repos: repos,
    };

    return user;
  } catch (error) {
    return error;
  }
};

module.exports = createNewUser;
