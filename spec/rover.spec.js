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
  let commandsArrayForStatusCheck= [new Command('STATUS_CHECK')];
  let specificMessage = specificRover.receiveMessage(new Message ("Test message for Status Check", commandsArrayForStatusCheck));
  expect(specificMessage.results[0].completed).toBe(true);
  expect(specificMessage.results[0].roverStatus.mode).toBe(specificRover.mode);
  expect(specificMessage.results[0].roverStatus.position).toBe(specificRover.position);
  expect(specificMessage.results[0].roverStatus.generatorWatts).toBe(specificRover.generatorWatts);
  })

  it("responds correctly to the mode change command", function() {
  let specificRover = new Rover(98382);
  let commandsArrayForModeChangeN = [new Command('MODE_CHANGE', 'NORMAL')];
  let commandsArrayForModeChangeLP = [new Command('MODE_CHANGE', 'LOW_POWER')];
  let falseCommandsArray = [new Command('MODE_CHANGE', 'TACOS')];
  let specificMessageN = specificRover.receiveMessage(new Message ("Test message for Mode Change - Normal", commandsArrayForModeChangeN));
  expect(specificMessageN.results[0].completed).toBe(true);
  expect(specificRover.mode).toBe("NORMAL")
  let specificMessageLP = specificRover.receiveMessage(new Message ("Test message for Mode Change - Low Power", commandsArrayForModeChangeLP));
  expect(specificMessageLP.results[0].completed).toBe(true);
  expect(specificRover.mode).toBe("LOW_POWER")
  let wrongMessage = specificRover.receiveMessage(new Message ("Test message for False Mode Change", falseCommandsArray));
  expect(wrongMessage.results[0].completed).toBe(false);
  })

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
  let specificRover = new Rover(98382, "LOW_POWER");
  let commandsArrayForMove = [new Command('MOVE', 90000)];
  let specificMessage = specificRover.receiveMessage(new Message ("Test message for Move", commandsArrayForMove));
  expect(specificMessage.results[0].completed).toBe(false)
  })

  it("responds with the position for the move command", function(){
  let specificRover = new Rover(98382);
  let commandsArrayForMove = [new Command('MOVE', 90000)];
  let specificMessage = specificRover.receiveMessage(new Message ("Test message for Move", commandsArrayForMove));
  expect(specificMessage.results[0].completed).toBe(true);
  expect(specificRover.position).toBe(90000);
  })
});
