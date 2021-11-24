let BN = web3.utils.BN;
const Recycle = artifacts.require("Recycle");
let { catchRevert } = require("./exceptionsHelpers.js");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Recycle", function (accounts) {
  const [_owner, collector, recycler] = accounts;

  const descrp = "blue wire";
  const code = "SHJ";
  const weight = "3"; // in KG
  const amountWei = web3.utils.toWei("0.002", "ether"); // 0.001 ether = 1000000000000000 wei

  let instance;

  beforeEach(async () => {
    instance = await Recycle.new(collector);
  });

  describe("Use Cases", () => {
    it("should have a waste collector assigned", async () => {
      assert.equal(
        typeof instance.wasteCollector,
        "function",
        "collector address is not set"
      );
    });

    it("should add a recyclable with the provided description, city code, and weight", async () => {
      const tx = await instance.addRecyclable(descrp, code, weight, {
        from: recycler,
      });
      const itemDescrp = tx.logs[0].args[0];

      assert.equal(itemDescrp , descrp, "item is not added");
    });

    it("should error when waste collector proposes a reward if the weight is not matching", async () => {
      await instance.addRecyclable(descrp, code, weight, { from: recycler });

      await catchRevert(
        instance.requestReward(recycler, "30", { from: collector })
      );
    });

    it("should error if the weight is not meeting the min weight requirement", async () => {
      const someValue = 1 / 2;
      await instance.addRecyclable(descrp, code, new BN(someValue), {
        from: recycler,
      });

      await catchRevert(
        instance.requestReward(recycler, new BN(someValue), { from: collector })
      );
    });

    it("should increase recycler's balance after owner reward approval", async () => {
      await instance.addRecyclable(descrp, code, weight, { from: recycler });

      await instance.requestReward(recycler, weight, { from: collector });

      var recyclerBalanceBefore = await web3.eth.getBalance(recycler);

      await instance.awardRecycler(recycler, {
        from: _owner,
        value: amountWei,
      });

      var recyclerBalanceAfter = await web3.eth.getBalance(recycler);

      assert.equal(
        new BN(recyclerBalanceAfter).toString(),
        new BN(recyclerBalanceBefore)
          .add(new BN(web3.utils.toWei("0.001", "ether")))
          .toString()
      );
    });

    describe("Enums", () => {
      it("should have a Processing status when item is added", async () => {
        const tx = await instance.addRecyclable(descrp, code, weight, {
          from: recycler,
        });
        const statusOfItem = tx.logs[0].args[2];

        assert.equal(
          statusOfItem.toString(10),
          Recycle.State.Processing,
          "the state of the item should be 'Processing'"
        );
      });

      it("should have a Recieved status when waste collector submits a reward request", async () => {
        await instance.addRecyclable(descrp, code, weight, { from: recycler });
        const tx = await instance.requestReward(recycler, weight, {
          from: collector,
        });
        const statusOfItem = tx.logs[0].args[4];

        assert.equal(
          statusOfItem.toString(10),
          Recycle.State.Recieved,
          "the state of the item should be 'Recieved'"
        );
      });

      it("should have a Rewarded status when recycler is rewarded", async () => {
        await instance.addRecyclable(descrp, code, weight, { from: recycler });

        await instance.requestReward(recycler, weight, { from: collector });

        const tx = await instance.awardRecycler(recycler, {
          from: _owner,
          value: amountWei,
        });

        const statusOfItem = tx.logs[0].args[2];

        assert.equal(
          statusOfItem.toString(10),
          Recycle.State.Rewarded,
          "the state of the item should be 'Rewarded'"
        );
      });
    });

    describe("Events", () => {
      // Event #1
      it("emits a LogRecyclableAdded event", async () => {
        let eventEmitted = false;
        const tx = await instance.addRecyclable(descrp, code, weight, {
          from: recycler,
        });

        if (tx.logs[0].event == "LogRecyclableAdded") {
          eventEmitted = true;
        }

        assert.equal(
          eventEmitted,
          true,
          "adding an item should emit a Recyclable Added event"
        );
      });

      // Event #2
      it("emits a LogRecieved event", async () => {
        let eventEmitted = false;

        await instance.addRecyclable(descrp, code, weight, { from: recycler });

        const tx = await instance.requestReward(recycler, weight, {
          from: collector,
        });

        if (tx.logs[0].event == "LogRecieved") {
          eventEmitted = true;
        }

        assert.equal(
          eventEmitted,
          true,
          "requesting a reward should emit a Recieved event"
        );
      });

      // Event #3
      it("emits a LogRewarded event", async () => {
        let eventEmitted = false;

        await instance.addRecyclable(descrp, code, weight, { from: recycler });

        await instance.requestReward(recycler, weight, { from: collector });

        const tx = await instance.awardRecycler(recycler, {
          from: _owner,
          value: amountWei,
        });

        if (tx.logs[0].event == "LogRewarded") {
          eventEmitted = true;
        }

        assert.equal(
          eventEmitted,
          true,
          "rewadring a recycler should emit a Recycler Rewarded event"
        );
      });
    });
  });
});
