import model from "./models/User";

export const home = async (req, res) => {
  const user = await model.find({});

  return res.render("home", { pageTitle: "Home", user });
};

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res) => {
  const { name, username, password } = req.body;
  console.log(name, username, password);
  const usernameExists = await model.exists({ username });

  const pageTitle = "join";
  if (usernameExists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username is already taken.",
    });
  }
  try {
    await model.create({
      name,
      username,
      password,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) =>
  res.render("login", {
    pageTitle: "Login",
  });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await model.findOne({ username });
  const pageTitle = "Login";
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username doesn't exist",
    });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
