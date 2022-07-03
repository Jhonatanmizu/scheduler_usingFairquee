const prompt = require("prompt-sync")();

let process = [];
// let time = 1;
let totalQuantum = 0;
let quantum = 3;
let quantOfProcess;
let finishedProcess = [];
/**
 * It creates a process object with a random id, a name, a process size, and a running status
 * @param name - The name of the process.
 * @param processSize - The size of the process.
 * @returns A process model object.
 */
function generateProcess(name, processSize) {
  let processModel = {
    id: Math.floor(Math.random() * 10),
    name: name,
    running: false,
    processSize: processSize,
    executedTime: 0,
    restTime: 0,
    createTime: 0,
    used: 0,
    shouldUse: 0,
  };

  return processModel;
}
function createProcess() {
  quant = prompt("Digite a quantidade de process : ");
  for (let i = 1; i < Number(quant); i++) {
    let pName = "processo : ";
    process.push(processModel(pName + i, Math.floor(Math.random() * 10 + 1)));
  }
}
/**
 * It removes a process from the process array if the process's rest time is less than or equal to zero
 * @param process - the process to be removed
 */
function removeProcess(process) {
  process.forEach((pr) => {
    console.log("O PR antes", pr);
    if (pr.restTime <= 0) {
      pr.running = false;
      console.log("O PR dps, pr time", pr, pr.restTime);

      let index = process.findIndex((pr) => pr == process);
      finishedProcess.push(process.splice(index, 1));
      console.log("PROCESSOS REMOVIDOS", finishedProcess);
    }
  });
}
/**
 * It sorts an array of objects by the value of the property `shouldUse`
 * @param process - The array of processes to sort.
 */
function sortByShouldUse(process) {
  console.log("ORDENANDO");
  process = process.sort((a, b) => {
    return b.shouldUse - a.shouldUse;
  });
  console.log(process);
}
function executeProcess() {
  quantOfProcess = process.length;
  if (process.length == 0) return;
  process = process.map((pr) => {
    if (!pr.running) {
      ex = {
        id: pr.id,
        name: pr.name,
        running: pr.running,
        processSize: pr.processSize,
        executedTime: pr.executedTime,
        restTime: pr.processSize,
        createTime: totalQuantum,
        used: pr.used,
        shouldUse: pr.shouldUse,
      };
      // globalTimer += quantum;
      return ex;
    } else {
      ex = {
        id: pr.id,
        name: pr.name,
        running: true,
        processSize: pr.processSize,
        executedTime: pr.executedTime + quantum,
        restTime: pr.restTime - quantum,
        createTime: pr.createTime,
        used: pr.used + quantum,
        shouldUse: pr.used / (totalQuantum / quantOfProcess),
      };
      totalQuantum += quantum;
      return ex;
    }
  });
  // console.log("PRCO", process);
  sortByShouldUse(process);
  removeProcess(process);
}
function main() {
  console.log("PROCESS SCHEDULER");
  // let title = "Process";
  // let processQuant = Number(prompt("Digite a quantidade de processos : "));
  // if (typeof processQuant !== "number") return;
  // for (let i = 0; i < processQuant; i++) {
  //   let sizeProcess = Math.floor(Math.random() * 10);
  //   process.push(createProcess(title + i, sizeProcess != 0 ? sizeProcess : 6));
  // }
  // do {
  createProcess();
  console.log("FINISHED", finishedProcess);
}

main();
