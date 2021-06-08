/**
 * @param {*} app
 */
class ApplicationController {
  constructor(app) {
    this.app = app;
    this.init();
  }
  init() {
    this.app.get("*", (req, res) => {
      res.status(404).send("Page not found");
    });
    this.app.post("*", (req, res) => {
      res.status(404).send("Page not found");
    });
  }
}
module.exports = (app) => new ApplicationController(app);
