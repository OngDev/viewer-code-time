const axios = require("axios");

const getUserFromGithub = async (nickname) => {
  try {
    const user = await axios.get(`https://api.github.com/users/${nickname}`);
    return {
      nickname: user.data.login,
      name: user.data.name,
      url: user.data.html_url,
      avatarUrl: user.data.avatar_url,
    };
  } catch (error) {
    console.log(error);
    return;
  }
};

const getReposFromGithub = async (nickname) => {
  try {
    const repos = await axios.get(
      `https://api.github.com/users/${nickname}/repos`
    );

    const newRepos = repos.data.map((repo) => {
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
