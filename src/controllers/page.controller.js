export const PageController = {
  home: (req, res) => {
    res.render(`home`, { title: "Spacedev MERN Typescript" });
  },
  courses: (req, res) => {
    res.render("course-list");
  },
  courseDetail: (req, res) => {
    res.render("course-detail");
  },
  sigin: (req, res) => {
    res.render("signin");
  },
};
