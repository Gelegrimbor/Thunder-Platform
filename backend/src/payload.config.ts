import path from 'path'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Users } from './collections/Users'
import { Posts } from './collections/Posts'
import { Pages } from './collections/Pages'

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Posts, Pages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  cors: [
    'http://localhost:3000',
    'https://localhost:3000',
    process.env.FRONTEND_URL || '',
  ].filter(Boolean),
  csrf: [
    'http://localhost:3000',
    'https://localhost:3000', 
    process.env.FRONTEND_URL || '',
  ].filter(Boolean),
})