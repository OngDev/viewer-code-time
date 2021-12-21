const axios = require("axios");

const getUserFromGithub = async (nickname) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${nickname}`
    );
    return {
      nickname: response.data.login,
      name: response.data.name || user.data.login,
      url: response.data.html_url,
      avatarUrl: response.data.avatar_url,
    };
  } catch (error) {
    console.log(error);
    return;
  }
};

const getReposFromGithub = async (nickname) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${nickname}/repos`
    );

    const newRepos = response.data.map((repo) => {
      return {
        name: repo.name,
        link: repo.url,
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
    const newUser = await getUserFromGithub(nickname);
    const newRepos = await getReposFromGithub(nickname);

    const user = {
      ...newUser,
      repos: newRepos,
    };

    return user;
  } catch (error) {
    return error;
  }
};

module.exports = createNewUser;
