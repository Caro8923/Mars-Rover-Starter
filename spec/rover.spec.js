const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets default values for mode and generatorWatts", function() {
    let specificRover = new Rover ("position");
    expect(specificRover.mode).toBe("NORMAL");
    expect(specificRover.generatorWatts).toBe(110);
  });

  it("response returned by receiveMessage contains the name of the message", function() {
    let specificRover = new Rover("position");
    let specificMessage = specificRover.receiveMessage(new Message ("nameGiven", "commandsArrayGiven"));
    expect(specificMessage).toHaveProperty("name")
  })

  // STUCK ON TEST 9 BELOW
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
  let specificRover = new Rover("position");
  let commandsGiven = ["MOVE", "STATUS_CHECK"];
  let specificMessage = specificRover.receiveMessage(new Message ("nameGiven", commandsGiven));
  expect(specificMessage.results).toBe(["MOVE", "STATUS_CHECK"]);
  })
});
