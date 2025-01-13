import { pgTable, index, foreignKey, text, timestamp, real, uniqueIndex, boolean, serial, integer, varchar, unique, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const transactionStatus = pgEnum("transaction_status", ['waiting_payment', 'processed', 'completed', 'failed'])
export const userRole = pgEnum("user_role", ['admin', 'user'])


export const sessions = pgTable("sessions", {
	sessionToken: text().primaryKey().notNull(),
	userId: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => {
	return {
		userIdIdx: index().using("btree", table.userId.asc().nullsLast().op("text_ops")),
		sessionsUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "sessions_userId_users_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const sitePaymentMethod = pgTable("sitePaymentMethod", {
	id: text().primaryKey().notNull(),
	masterPaymentMethodId: text(),
	siteId: text(),
}, (table) => {
	return {
		sitePaymentMethodSiteIdSitesIdFk: foreignKey({
			columns: [table.siteId],
			foreignColumns: [sites.id],
			name: "sitePaymentMethod_siteId_sites_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const masterVendor = pgTable("masterVendor", {
	id: text().primaryKey().notNull(),
	vendorName: text(),
});

export const transaction = pgTable("transaction", {
	id: text().primaryKey().notNull(),
	siteId: text(),
	productId: text(),
	phone: text(),
	totalAmount: real(),
	paymentMethod: text(),
	params: text(),
	status: transactionStatus().notNull(),
	timestamp: timestamp({ mode: 'string' }).defaultNow().notNull(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	subAmount: real(),
	quantity: real(),
}, (table) => {
	return {
		transactionSiteIdSitesIdFk: foreignKey({
			columns: [table.siteId],
			foreignColumns: [sites.id],
			name: "transaction_siteId_sites_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		transactionProductIdProductIdFk: foreignKey({
			columns: [table.productId],
			foreignColumns: [product.id],
			name: "transaction_productId_product_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const siteVendor = pgTable("siteVendor", {
	id: text().primaryKey().notNull(),
	masterVendorId: text(),
	siteId: text(),
});

export const posts = pgTable("posts", {
	id: text().primaryKey().notNull(),
	title: text(),
	description: text(),
	content: text(),
	slug: text().notNull(),
	image: text().default('https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/hxfcV5V-eInX3jbVUhjAt1suB7zB88uGd1j20b.png'),
	imageBlurhash: text().default('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC'),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
	published: boolean().default(false).notNull(),
	siteId: text(),
	userId: text(),
}, (table) => {
	return {
		siteIdIdx: index().using("btree", table.siteId.asc().nullsLast().op("text_ops")),
		slugSiteIdIdx: uniqueIndex().using("btree", table.slug.asc().nullsLast().op("text_ops"), table.siteId.asc().nullsLast().op("text_ops")),
		userIdIdx: index().using("btree", table.userId.asc().nullsLast().op("text_ops")),
		postsSiteIdSitesIdFk: foreignKey({
			columns: [table.siteId],
			foreignColumns: [sites.id],
			name: "posts_siteId_sites_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		postsUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "posts_userId_users_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const category = pgTable("category", {
	id: text().primaryKey().notNull(),
	iconUrl: text().default('https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/hxfcV5V-eInX3jbVUhjAt1suB7zB88uGd1j20b.png'),
	siteId: text(),
	name: text(),
});

export const examples = pgTable("examples", {
	id: serial().primaryKey().notNull(),
	name: text(),
	description: text(),
	domainCount: integer(),
	url: text(),
	image: text(),
	imageBlurhash: text(),
});

export const masterPaymentMethod = pgTable("masterPaymentMethod", {
	id: text().primaryKey().notNull(),
	name: text(),
});

export const users = pgTable("users", {
	id: text().primaryKey().notNull(),
	name: text(),
	username: text(),
	type: text().default('email'),
	password: varchar({ length: 255 }).default(''),
	email: text().notNull(),
	emailVerified: timestamp({ mode: 'string' }),
	image: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
});

export const sites = pgTable("sites", {
	id: text().primaryKey().notNull(),
	name: text(),
	description: text(),
	logo: text().default('https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/JRajRyC-PhBHEinQkupt02jqfKacBVHLWJq7Iy.png'),
	font: text().default('font-cal').notNull(),
	image: text().default('https://public.blob.vercel-storage.com/eEZHAoPTOBSYGBE3/hxfcV5V-eInX3jbVUhjAt1suB7zB88uGd1j20b.png'),
	imageBlurhash: text().default('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAACXBIWXMAABYlAAAWJQFJUiTwAAABfUlEQVR4nN3XyZLDIAwE0Pz/v3q3r55JDlSBplsIEI49h76k4opexCK/juP4eXjOT149f2Tf9ySPgcjCc7kdpBTgDPKByKK2bTPFEdMO0RDrusJ0wLRBGCIuelmWJAjkgPGDSIQEMBDCfA2CEPM80+Qwl0JkNxBimiaYGOTUlXYI60YoehzHJDEm7kxjV3whOQTD3AaCuhGKHoYhyb+CBMwjIAFz647kTqyapdV4enGINuDJMSScPmijSwjCaHeLcT77C7EC0C1ugaCTi2HYfAZANgj6Z9A8xY5eiYghDMNQBJNCWhASot0jGsSCUiHWZcSGQjaWWCDaGMOWnsCcn2QhVkRuxqqNxMSdUSElCDbp1hbNOsa6Ugxh7xXauF4DyM1m5BLtCylBXgaxvPXVwEoOBjeIFVODtW74oj1yBQah3E8tyz3SkpolKS9Geo9YMD1QJR1Go4oJkgO1pgbNZq0AOUPChyjvh7vlXaQa+X1UXwKxgHokB2XPxbX+AnijwIU4ahazAAAAAElFTkSuQmCC'),
	subdomain: text(),
	customDomain: text(),
	whatsapp: text(),
	currency: text().default('IDR'),
	message404: text().default('Blimey! You\'\'ve found a page that doesn\'\'t exist.'),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ mode: 'string' }).notNull(),
	userId: text(),
}, (table) => {
	return {
		userIdIdx: index().using("btree", table.userId.asc().nullsLast().op("text_ops")),
		sitesUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "sites_userId_users_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		sitesSubdomainUnique: unique("sites_subdomain_unique").on(table.subdomain),
		sitesCustomDomainUnique: unique("sites_customDomain_unique").on(table.customDomain),
	}
});

export const product = pgTable("product", {
	id: text().primaryKey().notNull(),
	code: text(),
	categoryId: text(),
	price: real(),
	siteId: text(),
	masterProductId: text(),
	formType: text(),
	name: text(),
	min: integer(),
	max: integer(),
	markupPct: real(),
	sellPrice: real(),
	active: boolean(),
}, (table) => {
	return {
		productCategoryIdCategoryIdFk: foreignKey({
			columns: [table.categoryId],
			foreignColumns: [category.id],
			name: "product_categoryId_category_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
	}
});

export const verificationTokens = pgTable("verificationTokens", {
	identifier: text().notNull(),
	token: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => {
	return {
		verificationTokensIdentifierTokenPk: primaryKey({ columns: [table.identifier, table.token], name: "verificationTokens_identifier_token_pk"}),
		verificationTokensTokenUnique: unique("verificationTokens_token_unique").on(table.token),
	}
});

export const accounts = pgTable("accounts", {
	userId: text().notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text().notNull(),
	refreshToken: text("refresh_token"),
	refreshTokenExpiresIn: integer("refresh_token_expires_in"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
	oauthTokenSecret: text("oauth_token_secret"),
	oauthToken: text("oauth_token"),
}, (table) => {
	return {
		userIdIdx: index().using("btree", table.userId.asc().nullsLast().op("text_ops")),
		accountsUserIdUsersIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "accounts_userId_users_id_fk"
		}).onUpdate("cascade").onDelete("cascade"),
		accountsProviderProviderAccountIdPk: primaryKey({ columns: [table.provider, table.providerAccountId], name: "accounts_provider_providerAccountId_pk"}),
	}
});
