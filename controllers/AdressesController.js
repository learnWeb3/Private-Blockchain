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
      const addresses = await this.client.listAddressGroupings();
      return res.status(200).send(addresses);
    });
  }

  // create new addresse
  /**
   * @param {*} name
   * @param {*} type
   */
  create() {
    this.app.post("/adresses", async (req, res) => {
      const { name, type } = request.params;
      if (name && type) {
        const address = await this.client.getNewAddress(name, type);
        return res.status(200).send(address);
      } else {
        return res.status(422).send("Missing required parameters : name/type");
      }
    });
  }
}

module.exports = (app, client) => new AdressesController(app, client);
