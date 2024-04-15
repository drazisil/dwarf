/**
 * @exports
 * @typedef {{name: string;extension: string;signature: number[]}} FileType
 */

/**
 * @description A map containing the supported file types.
 * @type {Map<string, FileType>}
 */
export const supportedFileTypes = new Map();
supportedFileTypes.set("obj", {
  name: "obj",
  extension: "obj",
  signature: [0x4c, 0x01],
});

/**
 * @description Converts a buffer to a hexadecimal string.
 * @param {Buffer} buffer The buffer to convert.
 * @returns {string} The hexadecimal string.
 */
export function toHexString(buffer) {
  return Array.prototype.map
    .call(buffer, (/** @type {{ toString: (arg0: number) => string; }} */ x) => ("00" + x.toString(16)).slice(-2))
    .join("");
}

/**
 * Retrieves the command line arguments passed to the script.
 * @returns {string} The first command line argument.
 */
export function getArguments() {
    const args = process.argv.slice(2);
  
    if (args.length === 0) {
      throw Error("No arguments provided");
    }
  
    return args[0];
  }
  
  /**
   * Retrieves the file extension from a given file path.
   *
   * @param {string} filePath - The path of the file.
   * @returns {string} The file extension.
   */
  export function getFileExtension(filePath) {
    let fileExtension = filePath.split(".").pop();
  
    if (!fileExtension) {
      throw Error("File extension not found");
    }
  
    return fileExtension === undefined ? "" : fileExtension;
  }
  
  /**
   * Checks the file type based on the given file extension.
   * @param {string} fileExtension - The file extension to check.
   * @returns {FileType} The file type.
   * @throws {Error} The file type is not supported.
   */
  export function checkFileType(fileExtension) {
    const fileType = supportedFileTypes.get(fileExtension);
  
    if (!fileType) {
      throw Error(`File type not supported: ${fileExtension}`);
    }
  
    return fileType;
  }

/**
 * @exports
 * @typedef {Object} ProgramParser
 * @property {string} name The name of the program parser.
 * @property {string} extension The file extension of the program parser.
 * @property {number[]} signature The signature of the program parser.
 */

/**
 * @description A program parser for the COFF file format.
 * @implements {ProgramParser}
 */
export class ObjProgramParser {
    /**
     * @description The name of the program parser.
     * @type {string}
     */
    name = "obj";
    /**
     * @description The file extension of the program parser.
     * @type {string}
     */
    extension = "obj";
    /**
     * @description The signature of the program parser.
     * @type {number[]}
     */
    signature = [0x4c, 0x01];
}

/**
 * @description A map containing the program parsers.
 * @type {Map<string, ProgramParser>}
 */
export const programParsers = new Map();
programParsers.set("obj", new ObjProgramParser());
