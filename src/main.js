const { findIndex } = require("lodash");

const prompt = require("prompt-sync")();

let process = [];
let tempArray = [];
let totalQuantum = 0;
let quantum = 3;
let quant = 0;
let quantOfProcess = 0;
let finishedProcess = [];

/**
 * It generates a process with a random id, a name, a process size, a create time, and a used time
 * @param name - The name of the process
 * @param processSize - The size of the process, which is the amount of time it takes to execute.
 * @returns A process model object.
 */
function generateProcess(name, processSize) {
  let processModel = {
    id: process.length,
    name: name, // nome do processo
    running: false, // se está  rodando
    processSize: processSize, // tamanho do processo
    executedTime: 0, // momento no qual é executado
    restTime: processSize, // tempo restante do processo
    createTime: totalQuantum, // momento no qual foi criado
    used: 0, // quanto usou
    shouldUse: 0, // quanto deveria usar
  };
  totalQuantum += quantum;

  return processModel;
}

/**
 * It creates a process with a random number of instructions
 */
function createProcess() {
  quant = prompt("Digite a quantidade de process : ");
  console.log("QUANT", quant);
  for (let i = 0; i < quant; i++) {
    let pName = "processo : ";
    process.push(
      generateProcess(pName + i, Math.floor(Math.random() * 10 + 1))
    );
  }
}
/**
 * It removes a process from the process array if the process's rest time is less than or equal to zero
 * @param process - the process to be removed
 */
function removeProcess(process) {
  console.log("PROCESSOS", process);
  if (process.length > 0) {
    for (let i = 0; i < process.length; i++) {
      if (process[i].restTime <= 0) {
        console.log("i e o processo", i, process[i]);
        finishedProcess.push(process.splice(i, 1));
      }
    }
  }
}

/**
 * It sorts the processes by their shouldUse value
 * @param process - The array of processes
 */
function sortByShouldUse(process) {
  process = process.sort((a, b) => {
    return b.shouldUse - a.shouldUse;
  });
  console.log("ARRAY ORDENADO", process);
}
let counter = 0;
/**
 * It will execute the process until all the process are finished
 * @returns the value of the last expression which is the call to the function itself.
 */
async function executeProcess() {
  // do {

  if (counter > process.length) return;
  for (let i = 0; i < process.length; i++) {
    if (process[i].restTime > 0) {
      process[i].restTime = process[i].restTime - quantum;
      process[i].used = process[i].used + quantum;
      process[i].shouldUse = process[i].used / (totalQuantum / process.length);
      process[i].shouldUse = Number(process[i].shouldUse.toFixed(3));
      totalQuantum += quantum;
    } else {
      counter++;
    }
  }
  sortByShouldUse(process);
  await addAnother();
  executeProcess();
  // } while (counter < process.length);
}
/**
 * When the user clicks the button, show the result of the finishedProcess variable in the console.
 */
function showResult() {
  console.log("RESULTADO");
  // sortByShouldUse(process);
  console.log(process);
}
function addAnother() {
  s = prompt("Deseja adicionar mais algum processo ?: ");
  let pName = "processo : ";

  if (s == "s")
    process.push(
      generateProcess(
        pName + Math.random() * 100,
        Math.floor(Math.random() * 10 + 1)
      )
    );
}
/**
 * Create a process, then execute it.
 */
function main() {
  createProcess();

  executeProcess();
}

main();
showResult();
