import { PrismaClient } from '@/generated/prisma';
import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import ws from 'ws'

// Setup
neonConfig.webSocketConstructor = ws
const connectionString = `${process.env.DB_URL}`

// Init prisma client
const adapter = new PrismaNeon({ connectionString })
const prisma = new PrismaClient({ adapter })

export default prisma;