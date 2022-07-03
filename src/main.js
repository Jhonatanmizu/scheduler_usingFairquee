const prompt = require("prompt-sync")();

let process = [];
let totalQuantum = 0;
let quantum = 3;
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
 * The above function creates a process.
 */
function createProcess() {
  quant = prompt("Digite a quantidade de process : ");
  for (let i = 0; i <= Number(quant); i++) {
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
  // console.log("quantidade de processos", quantOfProcess);
  // if (process.length > 0) {
  //   process.forEach((pr, index) => {
  //     console.log("LOG", pr);
  //     console.log("processos", process);
  //     if (pr.restTime <= 0) {
  //       pr.running = false;
  //       // let index = process.findIndex((pr) => pr.id );
  //       // finishedProcess.push(process.splice(index, 1));
  //       finishedProcess.push(pr);
  //     }
  //   });
  // }
  finishedProcess = process.map((pr) => pr.restTime < 0);
  console.log("FINIF", finishedProcess);
}
/**
 * It sorts an array of objects by the value of the property `shouldUse`
 * @param process - The array of processes to sort.
 */
function sortByShouldUse(process) {
  process = process.sort((a, b) => {
    return b.shouldUse - a.shouldUse;
  });
  // console.log(process);
}
/**
 * It executes the process, and then sorts the process by the shouldUse property
 * @returns the process array with the updated values.
 */
function executeProcess() {
  quantOfProcess = process.length;
  if (process.length == 0) return;
  process = process.map((pr) => {
    if (pr.restTime > 0) {
      ex = {
        id: pr.id,
        name: pr.name,
        running: true,
        processSize: pr.processSize,
        executedTime: totalQuantum,
        restTime: pr.restTime - quantum,
        createTime: pr.createTime,
        used: pr.used + quantum,
        shouldUse: pr.used / (totalQuantum / quantOfProcess),
      };
      totalQuantum += quantum;
      return ex;
    }
  });
  sortByShouldUse(process);
  removeProcess(process);
}
function showResult() {
  console.log("RESULTADO");
  console.log(finishedProcess);
}
/**
 * > The function creates a process, then executes the process until there is only one process left
 */
function main() {
  console.log("PROCESS SCHEDULER");
  createProcess();
  do {
    executeProcess();
  } while (process.length > 1);
}

main();

showResult();
