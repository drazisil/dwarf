import { open } from "fs/promises";
import {
    checkFileType,
    getArguments,
  getFileExtension,
  programParsers,
  supportedFileTypes,
  toHexString,
} from "./src/index.js";

let gExitCode = 0;

/**
 * Exits the process with the given exit code.
 * @param {number} exitCode - The exit code to be used.
 * @returns {void}
 */
function exit(exitCode = gExitCode) {
  process.exit(exitCode);
}



async function main() {
  const filePath = getArguments();
  console.log(`File path: ${filePath}`);

  let cursor = 0;

  const fileExtension = getFileExtension(filePath);

  const fileType = checkFileType(fileExtension);

  console.log(`File type: ${fileType.name}`);

  const signature = fileType.signature;

  const signatureLength = signature.length;

  const expectedSignature = toHexString(Buffer.from(signature));

  console.log(`Expected signature: ${expectedSignature}`);

  const handle = await open(filePath, "r");

  console.log("File opened");
  const inBuffer = Buffer.alloc(signatureLength);

  let readResult = await handle.read(inBuffer, 0, signatureLength, cursor);

  cursor += readResult.bytesRead;

  const actualSignature = toHexString(inBuffer);

  console.log(`Actual signature: ${actualSignature}`);

  if (actualSignature !== expectedSignature) {
    throw Error("Invalid signature");
  }

  console.log("Signature valid");

  const programParser = programParsers.get(fileType.name);

  if (!programParser) {
    throw Error(`Program parser not found: ${fileType.name}`);
  }

  console.log(`Program parser: ${programParser.name}`);

  handle.close();

  console.log("File closed");

  return exit();
}

main().catch((err) => {
  console.error(err);
  exit(1);
});

// Path: main.js
