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
      try {
        const wallets = await this.client.listWallets();
        return res.status(200).send(wallets);
      } catch (error) {
        return res.status(500).send("Something went wrong !");
      }
    });
  }

  /**
   * method to list wallet's specific adresses within the bitcoin-qt running node
   * @param {*} name;
   */
  load() {
    this.app.get("/wallets/:name", async (req, res) => {
      const { name } = req.params;
      if (name) {
        try {
          const wallet = await this.client.loadWallet(name);
          return res.status(200).send(wallet);
        } catch (error) {
          console.log(error)
          return res.status(500).send("Something went wrong !");
        }
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
      const { name } = req.body;
      if (name) {
        try {
          const wallet = await this.client.createWallet(name);
          return res.status(200).send(wallet);
        } catch (error) {
          return res.status(500).send("Something went wrong !");
        }
      } else {
        return res.status(422).send("Missing required parameter wallet name");
      }
    });
  }
}

module.exports = (app, client) => new WalletsController(app, client);
