import { t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { PrismaClient } from "@prisma/client";
//#region node_modules/.nitro/vite/services/ssr/assets/prisma-PkHBFGjN.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var globalForPrisma = global;
var dbUrl = process.env.DATABASE_URL || "postgres://3311796110bf58f00e928c02c0de98ab4db04718cb8f8637386d5e6a312ab05e:sk_Sltno9O7WdfN2Co_FsVLM@pooled.db.prisma.io:5432/postgres?sslmode=require";
if (dbUrl && dbUrl.includes("pooled.db.prisma.io") && !dbUrl.includes("pgbouncer=true")) dbUrl += (dbUrl.includes("?") ? "&" : "?") + "pgbouncer=true";
var prisma = globalForPrisma.prisma || new PrismaClient({
	log: ["query"],
	datasources: { ...dbUrl ? { db: { url: dbUrl } } : {} }
});
//#endregion
export { prisma as n, createServerRpc as t };
