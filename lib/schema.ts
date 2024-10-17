import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').unique(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  image: text('image'),
});

export const acronyms = sqliteTable('acronyms', {
  id: text('id').primaryKey(),
  term: text('term').notNull(),
  definition: text('definition').notNull(),
  category: text('category'),
  submittedBy: text('submittedBy').references(() => users.id),
  approved: integer('approved', { mode: 'boolean' }).default(false),
});

export const sponsoredAds = sqliteTable('sponsoredAds', {
  id: text('id').primaryKey(),
  acronymId: text('acronymId').references(() => acronyms.id),
  content: text('content').notNull(),
  sponsorName: text('sponsorName').notNull(),
  startDate: integer('startDate', { mode: 'timestamp_ms' }).notNull(),
  endDate: integer('endDate', { mode: 'timestamp_ms' }).notNull(),
});

export const sponsorshipRequests = sqliteTable('sponsorshipRequests', {
  id: text('id').primaryKey(),
  acronymId: text('acronymId').references(() => acronyms.id),
  sponsorName: text('sponsorName').notNull(),
  sponsorWebsite: text('sponsorWebsite').notNull(),
  sponsorMessage: text('sponsorMessage').notNull(),
  contactEmail: text('contactEmail').notNull(),
  status: text('status').notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp_ms' }).notNull().default(Date.now),
});