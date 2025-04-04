import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Use production database URL
const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL
    }
  }
});

async function main() {
  const email = 'admin@printnpack.com';
  const password = 'Admin@123';

  try {
    const existingAdmin = await db.user.findUnique({
      where: { email }
    });

    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN'
      }
    });

    console.log('Admin user created successfully:', {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await db.$disconnect();
  }); 