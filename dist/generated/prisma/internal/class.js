"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.10.0",
    "engineVersion": "0edf323efd1d98336f3f0a68684b56f689b900d3",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel User {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  password  String\n  name      String?\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  tasks Task[]\n}\n\nmodel Task {\n  id          Int      @id @default(autoincrement())\n  title       String\n  description String?\n  completed   Boolean  @default(false)\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  userId Int\n  user   User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"tasks\",\"kind\":\"object\",\"type\":\"Task\",\"relationName\":\"TaskToUser\"}],\"dbName\":null,\"schema\":null},\"Task\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"completed\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"TaskToUser\"}],\"dbName\":null,\"schema\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"user\",\"tasks\",\"_count\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"Task.findUnique\",\"Task.findUniqueOrThrow\",\"Task.findFirst\",\"Task.findFirstOrThrow\",\"Task.findMany\",\"Task.createOne\",\"Task.createMany\",\"Task.createManyAndReturn\",\"Task.updateOne\",\"Task.updateMany\",\"Task.updateManyAndReturn\",\"Task.upsertOne\",\"Task.deleteOne\",\"Task.deleteMany\",\"Task.groupBy\",\"Task.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"title\",\"description\",\"completed\",\"createdAt\",\"updatedAt\",\"userId\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"email\",\"password\",\"name\",\"every\",\"some\",\"none\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "eBYgCgQAAE0AIC4AAEgAMC8AAAkAEDAAAEgAMDECAAAAATVAAEwAITZAAEwAIUMBAAAAAUQBAEoAIUUBAEsAIQEAAAABACALAwAAUAAgLgAATgAwLwAAAwAQMAAATgAwMQIASQAhMgEASgAhMwEASwAhNCAATwAhNUAATAAhNkAATAAhNwIASQAhAgMAAHIAIDMAAFEAIAsDAABQACAuAABOADAvAAADABAwAABOADAxAgAAAAEyAQBKACEzAQBLACE0IABPACE1QABMACE2QABMACE3AgBJACEDAAAAAwAgAQAABAAwAgAABQAgAQAAAAMAIAEAAAABACAKBAAATQAgLgAASAAwLwAACQAQMAAASAAwMQIASQAhNUAATAAhNkAATAAhQwEASgAhRAEASgAhRQEASwAhAgQAAHEAIEUAAFEAIAMAAAAJACABAAAKADACAAABACADAAAACQAgAQAACgAwAgAAAQAgAwAAAAkAIAEAAAoAMAIAAAEAIAcEAABwACAxAgAAAAE1QAAAAAE2QAAAAAFDAQAAAAFEAQAAAAFFAQAAAAEBCwAADgAgBjECAAAAATVAAAAAATZAAAAAAUMBAAAAAUQBAAAAAUUBAAAAAQELAAAQADABCwAAEAAwBwQAAGMAIDECAFsAITVAAFoAITZAAFoAIUMBAFcAIUQBAFcAIUUBAFgAIQIAAAABACALAAATACAGMQIAWwAhNUAAWgAhNkAAWgAhQwEAVwAhRAEAVwAhRQEAWAAhAgAAAAkAIAsAABUAIAIAAAAJACALAAAVACADAAAAAQAgEgAADgAgEwAAEwAgAQAAAAEAIAEAAAAJACAGBQAAXgAgGAAAXwAgGQAAYgAgGgAAYQAgGwAAYAAgRQAAUQAgCS4AAEcAMC8AABwAEDAAAEcAMDECADYAITVAADoAITZAADoAIUMBADcAIUQBADcAIUUBADgAIQMAAAAJACABAAAbADAXAAAcACADAAAACQAgAQAACgAwAgAAAQAgAQAAAAUAIAEAAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACAIAwAAXQAgMQIAAAABMgEAAAABMwEAAAABNCAAAAABNUAAAAABNkAAAAABNwIAAAABAQsAACQAIAcxAgAAAAEyAQAAAAEzAQAAAAE0IAAAAAE1QAAAAAE2QAAAAAE3AgAAAAEBCwAAJgAwAQsAACYAMAgDAABcACAxAgBbACEyAQBXACEzAQBYACE0IABZACE1QABaACE2QABaACE3AgBbACECAAAABQAgCwAAKQAgBzECAFsAITIBAFcAITMBAFgAITQgAFkAITVAAFoAITZAAFoAITcCAFsAIQIAAAADACALAAArACACAAAAAwAgCwAAKwAgAwAAAAUAIBIAACQAIBMAACkAIAEAAAAFACABAAAAAwAgBgUAAFIAIBgAAFMAIBkAAFYAIBoAAFUAIBsAAFQAIDMAAFEAIAouAAA1ADAvAAAyABAwAAA1ADAxAgA2ACEyAQA3ACEzAQA4ACE0IAA5ACE1QAA6ACE2QAA6ACE3AgA2ACEDAAAAAwAgAQAAMQAwFwAAMgAgAwAAAAMAIAEAAAQAMAIAAAUAIAouAAA1ADAvAAAyABAwAAA1ADAxAgA2ACEyAQA3ACEzAQA4ACE0IAA5ACE1QAA6ACE2QAA6ACE3AgA2ACENBQAAPAAgGAAARgAgGQAAPAAgGgAAPAAgGwAAPAAgOAIAAAABOQIAAAAEOgIAAAAEOwIAAAABPAIAAAABPQIAAAABPgIAAAABPwIARQAhDgUAADwAIBoAAEQAIBsAAEQAIDgBAAAAATkBAAAABDoBAAAABDsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BAEMAIUABAAAAAUEBAAAAAUIBAAAAAQ4FAABBACAaAABCACAbAABCACA4AQAAAAE5AQAAAAU6AQAAAAU7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQBAACFAAQAAAAFBAQAAAAFCAQAAAAEFBQAAPAAgGgAAPwAgGwAAPwAgOCAAAAABPyAAPgAhCwUAADwAIBoAAD0AIBsAAD0AIDhAAAAAATlAAAAABDpAAAAABDtAAAAAATxAAAAAAT1AAAAAAT5AAAAAAT9AADsAIQsFAAA8ACAaAAA9ACAbAAA9ACA4QAAAAAE5QAAAAAQ6QAAAAAQ7QAAAAAE8QAAAAAE9QAAAAAE-QAAAAAE_QAA7ACEIOAIAAAABOQIAAAAEOgIAAAAEOwIAAAABPAIAAAABPQIAAAABPgIAAAABPwIAPAAhCDhAAAAAATlAAAAABDpAAAAABDtAAAAAATxAAAAAAT1AAAAAAT5AAAAAAT9AAD0AIQUFAAA8ACAaAAA_ACAbAAA_ACA4IAAAAAE_IAA-ACECOCAAAAABPyAAPwAhDgUAAEEAIBoAAEIAIBsAAEIAIDgBAAAAATkBAAAABToBAAAABTsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BAEAAIUABAAAAAUEBAAAAAUIBAAAAAQg4AgAAAAE5AgAAAAU6AgAAAAU7AgAAAAE8AgAAAAE9AgAAAAE-AgAAAAE_AgBBACELOAEAAAABOQEAAAAFOgEAAAAFOwEAAAABPAEAAAABPQEAAAABPgEAAAABPwEAQgAhQAEAAAABQQEAAAABQgEAAAABDgUAADwAIBoAAEQAIBsAAEQAIDgBAAAAATkBAAAABDoBAAAABDsBAAAAATwBAAAAAT0BAAAAAT4BAAAAAT8BAEMAIUABAAAAAUEBAAAAAUIBAAAAAQs4AQAAAAE5AQAAAAQ6AQAAAAQ7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQBEACFAAQAAAAFBAQAAAAFCAQAAAAENBQAAPAAgGAAARgAgGQAAPAAgGgAAPAAgGwAAPAAgOAIAAAABOQIAAAAEOgIAAAAEOwIAAAABPAIAAAABPQIAAAABPgIAAAABPwIARQAhCDgIAAAAATkIAAAABDoIAAAABDsIAAAAATwIAAAAAT0IAAAAAT4IAAAAAT8IAEYAIQkuAABHADAvAAAcABAwAABHADAxAgA2ACE1QAA6ACE2QAA6ACFDAQA3ACFEAQA3ACFFAQA4ACEKBAAATQAgLgAASAAwLwAACQAQMAAASAAwMQIASQAhNUAATAAhNkAATAAhQwEASgAhRAEASgAhRQEASwAhCDgCAAAAATkCAAAABDoCAAAABDsCAAAAATwCAAAAAT0CAAAAAT4CAAAAAT8CADwAIQs4AQAAAAE5AQAAAAQ6AQAAAAQ7AQAAAAE8AQAAAAE9AQAAAAE-AQAAAAE_AQBEACFAAQAAAAFBAQAAAAFCAQAAAAELOAEAAAABOQEAAAAFOgEAAAAFOwEAAAABPAEAAAABPQEAAAABPgEAAAABPwEAQgAhQAEAAAABQQEAAAABQgEAAAABCDhAAAAAATlAAAAABDpAAAAABDtAAAAAATxAAAAAAT1AAAAAAT5AAAAAAT9AAD0AIQNGAAADACBHAAADACBIAAADACALAwAAUAAgLgAATgAwLwAAAwAQMAAATgAwMQIASQAhMgEASgAhMwEASwAhNCAATwAhNUAATAAhNkAATAAhNwIASQAhAjggAAAAAT8gAD8AIQwEAABNACAuAABIADAvAAAJABAwAABIADAxAgBJACE1QABMACE2QABMACFDAQBKACFEAQBKACFFAQBLACFJAAAJACBKAAAJACAAAAAAAAABTgEAAAABAU4BAAAAAQFOIAAAAAEBTkAAAAABBU4CAAAAAVQCAAAAAVUCAAAAAVYCAAAAAVcCAAAAAQUSAAB0ACATAAB3ACBLAAB1ACBMAAB2ACBRAAABACADEgAAdAAgSwAAdQAgUQAAAQAgAAAAAAALEgAAZAAwEwAAaQAwSwAAZQAwTAAAZgAwTQAAZwAgTgAAaAAwTwAAaAAwUAAAaAAwUQAAaAAwUgAAagAwUwAAawAwBjECAAAAATIBAAAAATMBAAAAATQgAAAAATVAAAAAATZAAAAAAQIAAAAFACASAABvACADAAAABQAgEgAAbwAgEwAAbgAgAQsAAHMAMAsDAABQACAuAABOADAvAAADABAwAABOADAxAgAAAAEyAQBKACEzAQBLACE0IABPACE1QABMACE2QABMACE3AgBJACECAAAABQAgCwAAbgAgAgAAAGwAIAsAAG0AIAouAABrADAvAABsABAwAABrADAxAgBJACEyAQBKACEzAQBLACE0IABPACE1QABMACE2QABMACE3AgBJACEKLgAAawAwLwAAbAAQMAAAawAwMQIASQAhMgEASgAhMwEASwAhNCAATwAhNUAATAAhNkAATAAhNwIASQAhBjECAFsAITIBAFcAITMBAFgAITQgAFkAITVAAFoAITZAAFoAIQYxAgBbACEyAQBXACEzAQBYACE0IABZACE1QABaACE2QABaACEGMQIAAAABMgEAAAABMwEAAAABNCAAAAABNUAAAAABNkAAAAABBBIAAGQAMEsAAGUAME0AAGcAIFEAAGgAMAACBAAAcQAgRQAAUQAgBjECAAAAATIBAAAAATMBAAAAATQgAAAAATVAAAAAATZAAAAAAQYxAgAAAAE1QAAAAAE2QAAAAAFDAQAAAAFEAQAAAAFFAQAAAAECAAAAAQAgEgAAdAAgAwAAAAkAIBIAAHQAIBMAAHgAIAgAAAAJACALAAB4ACAxAgBbACE1QABaACE2QABaACFDAQBXACFEAQBXACFFAQBYACEGMQIAWwAhNUAAWgAhNkAAWgAhQwEAVwAhRAEAVwAhRQEAWAAhAgQGAgUAAwEDAAEBBAcAAAAABQUACBgACRkAChoACxsADAAAAAAABQUACBgACRkAChoACxsADAEDAAEBAwABBQUAERgAEhkAExoAFBsAFQAAAAAABQUAERgAEhkAExoAFBsAFQYCAQcIAQgLAQkMAQoNAQwPAQ0RBA4SBQ8UARAWBBEXBhQYARUZARYaBBwdBx0eDR4fAh8gAiAhAiEiAiIjAiMlAiQnBCUoDiYqAicsBCgtDykuAiovAiswBCwzEC00Fg"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map