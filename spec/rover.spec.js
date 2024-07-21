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
    let commandsArrayGiven = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let specificMessage = specificRover.receiveMessage(new Message ("Test message with two commands", commandsArrayGiven));
    expect(specificMessage).toHaveProperty("message")
    expect(specificMessage.message).toBe("Test message with two commands")
  })

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
  let specificRover = new Rover("position");
  let commandsArrayGiven = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let specificMessage = specificRover.receiveMessage(new Message ("Test message with two commands", commandsArrayGiven));
  expect(specificMessage.results.length).toBe(2);
  })

  it("responds correctly to the status check command", function() {
  let specificRover = new Rover(98382);
  let commandsArrayGiven = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let specificMessage = specificRover.receiveMessage(new Message ("Test message with two commands", commandsArrayGiven));
  expect(specificMessage.results[1].roverStatus.mode).toBe(specificRover.mode);
  expect(specificMessage.results[1].roverStatus.position).toBe(specificRover.position);
  expect(specificMessage.results[1].roverStatus.generatorWatts).toBe(specificRover.generatorWatts);
  })
});
