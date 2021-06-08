class AdressesController {
  /**
   * @param {*} app
   * @param {*} client
   */
  constructor(app, client) {
    this.app = app;
    this.client = client;
    this.index();
    this.create();
  }

  // method to list adresses within the bitcoin-qt running node
  index() {
    this.app.get("/addresses", async (req, res) => {
      try {
        const addresses = await this.client.listAddressGroupings();
        return res.status(200).send(addresses);
      } catch (error) {
        console.log(error)
        return res.status(500).send("Something went wrong !");
      }
    });
  }

  // create new addresse
  /**
   * @param {*} name
   * @param {*} type
   */
  create() {
    this.app.post("/addresses", async (req, res) => {
      const { name, type } = req.body;
      if (name && type) {
        try {
          const address = await this.client.getNewAddress(name, type);
          return res.status(200).send(address);
        } catch (error) {
          console.log(error);
          return res.status(500).send("Something went wrong !");
        }
      } else {
        return res.status(422).send("Missing required parameters : name/type");
      }
    });
  }
}

module.exports = (app, client) => new AdressesController(app, client);
