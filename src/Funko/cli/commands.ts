import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { FunkoManager } from "../services/FunkoManager.js";
import { Funko } from "../models/Funko.js";
import { FunkoType } from "../models/FunkoType.js";
import { FunkoGenre } from "../models/FunkoGenre.js";
import { formatSuccess, formatFunkoValue } from "../utils/chalkUtils.js";

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
yargs(hideBin(process.argv))
  .command(
    "add",
    "Añadir un Funko",
    {
      user: { type: "string", demandOption: true },
      id: { type: "number", demandOption: true },
      name: { type: "string", demandOption: true },
      desc: { type: "string", demandOption: true },
      type: { type: "string", demandOption: true },
      genre: { type: "string", demandOption: true },
      franchise: { type: "string", demandOption: true },
      number: { type: "number", demandOption: true },
      exclusive: { type: "boolean", demandOption: true },
      specialFeatures: { type: "string", demandOption: true },
      marketValue: { type: "number", demandOption: true },
    },
    (argv) => {
      const manager = new FunkoManager(argv.user);
      const funko = new Funko(
        argv.id,
        argv.name,
        argv.desc,
        argv.type as FunkoType,
        argv.genre as FunkoGenre,
        argv.franchise,
        argv.number,
        argv.exclusive,
        argv.specialFeatures,
        argv.marketValue
      );
      manager.addFunko(funko);
      console.log(formatSuccess("Funko añadido con éxito!"));
    }
  )
  .command(
    "list",
    "Listar Funkos",
    {
      user: { type: "string", demandOption: true },
    },
    (argv) => {
      const manager = new FunkoManager(argv.user);
      const funkos = manager.listFunkos();
      funkos.forEach((funko) => {
        console.log(`${funko.name} - ${formatFunkoValue(funko.marketValue)}`);
      });
    }
  )
  .help()
  .argv;