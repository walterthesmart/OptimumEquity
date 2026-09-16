import { r as createServerFn } from "./server-kqd0nYar.mjs";
import { t as createServerRpc } from "./createServerRpc-D49bnOyn.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { PrismaClient } from "@prisma/client";
//#region node_modules/.nitro/vite/services/ssr/assets/transactions-ZuKdjeZX.js
var globalForPrisma = global;
var dbUrl = process.env.DATABASE_URL || "postgres://3311796110bf58f00e928c02c0de98ab4db04718cb8f8637386d5e6a312ab05e:sk_Sltno9O7WdfN2Co_FsVLM@pooled.db.prisma.io:5432/postgres?sslmode=require";
if (dbUrl && dbUrl.includes("pooled.db.prisma.io") && !dbUrl.includes("pgbouncer=true")) dbUrl += (dbUrl.includes("?") ? "&" : "?") + "pgbouncer=true";
var prisma = globalForPrisma.prisma || new PrismaClient({
	log: ["query"],
	datasources: { ...dbUrl ? { db: { url: dbUrl } } : {} }
});
var transactionSchema = objectType({
	id: stringType().optional(),
	symbol: stringType().min(1),
	date: stringType(),
	type: enumType([
		"BUY",
		"SELL",
		"TXIN",
		"TXOUT"
	]),
	price: numberType().nonnegative(),
	shares: numberType().nonnegative(),
	fees: numberType().nonnegative().default(0),
	assetClass: stringType().default("Stock")
});
var bulkTransactionSchema = arrayType(transactionSchema);
var getTransactions_createServerFn_handler = createServerRpc({
	id: "c392bddaba2f7d944f5d30dca9b4ec590a291ca19ae312efbd9237e7cbb2ede2",
	name: "getTransactions",
	filename: "src/actions/transactions.ts"
}, (opts) => getTransactions.__executeServer(opts));
var getTransactions = createServerFn({ method: "GET" }).handler(getTransactions_createServerFn_handler, async () => {
	console.log("Backend: getTransactions called");
	try {
		const transactions = await prisma.transaction.findMany({ orderBy: { date: "asc" } });
		console.log(`Backend: found ${transactions.length} transactions`);
		return { data: transactions };
	} catch (error) {
		console.error("Failed to fetch transactions:", error);
		return { error: "Internal server error" };
	}
});
var addTransaction_createServerFn_handler = createServerRpc({
	id: "691cf5e7844d155df9f44c3e710a9bb532b1c83e5767a25446aa607266c8e177",
	name: "addTransaction",
	filename: "src/actions/transactions.ts"
}, (opts) => addTransaction.__executeServer(opts));
var addTransaction = createServerFn({ method: "POST" }).validator(transactionSchema).handler(addTransaction_createServerFn_handler, async ({ data }) => {
	try {
		return { data: await prisma.transaction.create({ data }) };
	} catch (error) {
		console.error("Failed to create transaction:", error);
		return { error: "Internal server error" };
	}
});
var addBulkTransactions_createServerFn_handler = createServerRpc({
	id: "f3ccd206433bf9600d92ad0584bf98b65bba2c8e7c41f6e350d0bf5d930fee26",
	name: "addBulkTransactions",
	filename: "src/actions/transactions.ts"
}, (opts) => addBulkTransactions.__executeServer(opts));
var addBulkTransactions = createServerFn({ method: "POST" }).validator(bulkTransactionSchema).handler(addBulkTransactions_createServerFn_handler, async ({ data }) => {
	try {
		return { data: await prisma.$transaction(data.map((tx) => prisma.transaction.create({ data: tx }))) };
	} catch (error) {
		console.error("Failed to create transactions:", error);
		return { error: "Internal server error" };
	}
});
var removeTransaction_createServerFn_handler = createServerRpc({
	id: "ab5b10726cc79cbc44a1f3cb98037f59781102c40b6c9d9f4dbf35296bf368af",
	name: "removeTransaction",
	filename: "src/actions/transactions.ts"
}, (opts) => removeTransaction.__executeServer(opts));
var removeTransaction = createServerFn({ method: "POST" }).validator(objectType({ id: stringType() })).handler(removeTransaction_createServerFn_handler, async ({ data: { id } }) => {
	try {
		await prisma.transaction.delete({ where: { id } });
		return { success: true };
	} catch (error) {
		console.error("Failed to delete transaction:", error);
		return { error: "Internal server error" };
	}
});
var clearAllTransactions_createServerFn_handler = createServerRpc({
	id: "9a966739e901e4ddb39b77c07b5763a8785427097d9806c3810977a2d5e8439f",
	name: "clearAllTransactions",
	filename: "src/actions/transactions.ts"
}, (opts) => clearAllTransactions.__executeServer(opts));
var clearAllTransactions = createServerFn({ method: "POST" }).handler(clearAllTransactions_createServerFn_handler, async () => {
	try {
		await prisma.transaction.deleteMany();
		return { success: true };
	} catch (error) {
		console.error("Failed to clear transactions:", error);
		return { error: "Internal server error" };
	}
});
//#endregion
export { addBulkTransactions_createServerFn_handler, addTransaction_createServerFn_handler, clearAllTransactions_createServerFn_handler, getTransactions_createServerFn_handler, removeTransaction_createServerFn_handler };
