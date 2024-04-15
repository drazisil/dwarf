import { open } from "fs/promises";
import { supportedFileTypes, toHexString } from "./src/index.js";

let gExitCode = 0;

function exit() {
  process.exit(gExitCode);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("No arguments provided");
    gExitCode = 1;
    exit();
  }

  const filePath = args[0];

  console.log(`File path: ${filePath}`);

  let cursor = 0;

  let fileExtension = filePath.split(".").pop();

  const fileType = supportedFileTypes.get(fileExtension);

  if (!fileType) {
    console.log(`File type not supported: ${fileExtension}`);
    gExitCode = 1;
    exit();
  }

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
    console.log("Invalid signature");
    gExitCode = 1;
    exit();
  }

  console.log("Signature valid");

  handle.close();

  console.log("File closed");

  exit();
}

main().catch((err) => {
  console.error(err);
  gExitCode = 1;
  exit();
});

// Path: main.js
