import { relations } from "drizzle-orm/relations";
import { users, sessions, sites, sitePaymentMethod, transaction, product, posts, category, masterVendor, siteVendor, accounts } from "./schema";

export const sessionsRelations = relations(sessions, ({one}) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	sessions: many(sessions),
	posts: many(posts),
	sites: many(sites),
	accounts: many(accounts),
}));

export const sitePaymentMethodRelations = relations(sitePaymentMethod, ({one}) => ({
	site: one(sites, {
		fields: [sitePaymentMethod.siteId],
		references: [sites.id]
	}),
}));

export const sitesRelations = relations(sites, ({one, many}) => ({
	sitePaymentMethods: many(sitePaymentMethod),
	transactions: many(transaction),
	posts: many(posts),
	user: one(users, {
		fields: [sites.userId],
		references: [users.id]
	}),
	siteVendors: many(siteVendor),
}));

export const transactionRelations = relations(transaction, ({one}) => ({
	site: one(sites, {
		fields: [transaction.siteId],
		references: [sites.id]
	}),
	product: one(product, {
		fields: [transaction.productId],
		references: [product.id]
	}),
}));

export const productRelations = relations(product, ({one, many}) => ({
	transactions: many(transaction),
	category: one(category, {
		fields: [product.categoryId],
		references: [category.id]
	}),
}));

export const postsRelations = relations(posts, ({one}) => ({
	site: one(sites, {
		fields: [posts.siteId],
		references: [sites.id]
	}),
	user: one(users, {
		fields: [posts.userId],
		references: [users.id]
	}),
}));

export const categoryRelations = relations(category, ({many}) => ({
	products: many(product),
}));

export const siteVendorRelations = relations(siteVendor, ({one}) => ({
	masterVendor: one(masterVendor, {
		fields: [siteVendor.masterVendorId],
		references: [masterVendor.id]
	}),
	site: one(sites, {
		fields: [siteVendor.siteId],
		references: [sites.id]
	}),
}));

export const masterVendorRelations = relations(masterVendor, ({many}) => ({
	siteVendors: many(siteVendor),
}));

export const accountsRelations = relations(accounts, ({one}) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id]
	}),
}));