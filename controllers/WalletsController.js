class WalletsController {
  /**
   * @param {*} app
   * @param {*} client
   */
  constructor(app, client) {
    this.app = app;
    this.client = client;
    this.index();
    this.create();
    this.load();
  }
  // method to list wallets within the bitcoin-qt running node
  index() {
    this.app.get("/wallets", async (req, res) => {
      const wallets = await this.client.listwallets();
      return res.status(200).send(wallets);
    });
  }

  /**
   * method to list wallet's specific adresses within the bitcoin-qt running node
   * @param {*} name;
   */
  load() {
    this.app.get("/wallets/:name", async (req, res) => {
      const { name } = request.params;
      if (name) {
        const wallet = await this.client.loadWallet(name);
        return res.status(200).send(wallet);
      } else {
        return res.status(422).send("Missing required parameter wallet name");
      }
    });
  }

  /**
   * create a new wallet
   * @param {*} name;
   */
  create() {
    this.app.post("/wallets", async (req, res) => {
      const { name } = request.params;
      if (name) {
        const wallet = await this.client.createWallet(name);
        return res.status(200).send(wallet);
      } else {
        return res.status(422).send("Missing required parameter wallet name");
      }
    });
  }
}

module.exports = (app, client) => new WalletsController(app, client);
