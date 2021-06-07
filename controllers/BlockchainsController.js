/**
 *          BlockchainController
 *       (Do not change this code)
 *
 * This class expose the endpoints that the client applications will use to interact with the
 * Blockchain dataset
 */
class BlockchainsController {
  //The constructor receive the instance of the express.js app and the Blockchain class
  /**
   * @param {*} app;
   * @param {*} blockchainObj
   */
  constructor(app, blockchainObj) {
    this.app = app;
    this.blockchain = blockchainObj;
    // All the endpoints methods needs to be called in the constructor to initialize the route.
    this.getBlockByHeight();
    this.requestOwnership();
    this.submitStar();
    this.getBlockByHash();
    this.getStarsByOwner();
  }

  // Enpoint to Get a Block by Height (GET Endpoint)
  /**
   * @param {*} height
   */
  getBlockByHeight() {
    this.app.get("/block/height/:height", async (req, res) => {
      let { height } = req.params;
      if (height) {
        height = parseInt(height);
        let block = await this.blockchain.getBlockByHeight(height);
        if (block) {
          return res.status(200).json(block);
        } else {
          return res.status(404).send("Block Not Found!");
        }
      } else {
        return res.status(404).send("Block Not Found! Review the Parameters!");
      }
    });
  }

  // Endpoint that allows user to request Ownership of a Wallet address (POST Endpoint)
  /**
   * @param {*} address;
   */
  requestOwnership() {
    this.app.post("/requestValidation", async (req, res) => {
      const { address } = req.body;
      if (address) {
        const message =
          await this.blockchain.requestMessageOwnershipVerification(address);
        if (message) {
          return res.status(200).json(message);
        } else {
          return res.status(500).send("An error happened!");
        }
      } else {
        return res.status(500).send("Check the Body Parameter!");
      }
    });
  }

  // Endpoint that allow Submit a Star, yu need first to `requestOwnership` to have the message (POST endpoint)
  /**
   * @param {*} adresses;
   *  @param {*} message;
   *  @param {*} signature;
   *  @param {*} star;
   */
  submitStar() {
    this.app.post("/submitstar", async (req, res) => {
      const { address, message, signature, star } = req.body;
      if (address && message && signature && star) {
        try {
          let block = await this.blockchain.submitStar(
            address,
            message,
            signature,
            star
          );
          if (block) {
            return res.status(200).json(block);
          } else {
            return res.status(500).send("An error happened!");
          }
        } catch (error) {
          return res.status(500).send(error);
        }
      } else {
        return res.status(500).send("Check the Body Parameter!");
      }
    });
  }

  // This endpoint allows you to retrieve the block by hash (GET endpoint)
  /**
   * @param {*} hash;
   */
  getBlockByHash() {
    this.app.get("/block/hash/:hash", async (req, res) => {
      const { hash } = req.params;
      if (hash) {
        let block = await this.blockchain.getBlockByHash(hash);
        if (block) {
          return res.status(200).json(block);
        } else {
          return res.status(404).send("Block Not Found!");
        }
      } else {
        return res.status(404).send("Block Not Found! Review the Parameters!");
      }
    });
  }

  // This endpoint allows you to request the list of Stars registered by an owner
  /**
   * @param {*} address;
   */
  getStarsByOwner() {
    this.app.get("/blocks/:address", async (req, res) => {
      const { address } = req.params;
      if (address) {
        try {
          let stars = await this.blockchain.getStarsByWalletAddress(address);
          if (stars) {
            return res.status(200).json(stars);
          } else {
            return res.status(404).send("Block Not Found!");
          }
        } catch (error) {
          return res.status(500).send("An error happened!");
        }
      } else {
        return res.status(500).send("Block Not Found! Review the Parameters!");
      }
    });
  }
}

module.exports = (app, blockchainObj) =>
  new BlockchainsController(app, blockchainObj);
