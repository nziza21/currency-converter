import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const currencies = {
  USD: 1.0,
  JPY: 113.5,
  EUR: 0.85,
  GBP: 0.73,
  RWF: 1250
};

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

function convertCurrency(from, to, amount) {
  const amountInUSD = amount / currencies[from];
  return amountInUSD * currencies[to];
}

async function runProgram() {
  while (true) {
    console.log("\n1. Convert Currencies");
    console.log("2. Exit program");

    const choice = await ask("What do you want to do? ");

    if (choice === "1") {
      const from = (await ask("What do you want to convert from: ")).toUpperCase();
      const to = (await ask("What do you want to convert to: ")).toUpperCase();
      const amount = Number(await ask("Enter the amount: "));

      if (!currencies[from] || !currencies[to] || isNaN(amount)) {
        console.log("Invalid input. Please try again.");
        continue;
      }

      const result = convertCurrency(from, to, amount);
      console.log(`Amount: ${Math.round(result)}`);
    } 
    else if (choice === "2") {
      console.log("Goodbye!");
      rl.close();
      break;
    } 
    else {
      console.log("Invalid option. Choose 1 or 2.");
    }
  }
}

runProgram();