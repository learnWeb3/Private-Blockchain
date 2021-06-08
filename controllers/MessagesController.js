class MessagesController {
  /**
   *
   * @param {*} app
   * @param {*} client
   */
  constructor(app, client) {
    this.client = client;
    this.app = app;
    this.sign();
  }

  // method to sign a message using "legacy" address and a message
  sign() {
    this.app.post("/messages/sign", async (req, res) => {
      const { address, message } = req.body;
      if (address && message) {
        try {
          const signature = await this.client.signMessage(address, message);
          return res.status(200).send({
            address,
            message,
            signature,
          });
        } catch (error) {
          return res.status(500).send("Something went wrong !");
        }
      } else {
        return res.status(422).send("Adress, message are requested");
      }
    });
  }
}

module.exports = (app, client) => new MessagesController(app, client);
