import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Seed users
  const users = [
    {
      username: 'superadmin',
      password: await bcrypt.hash('admin123', 10),
      role: UserRole.SUPERADMIN,
    },
    {
      username: 'admin',
      password: await bcrypt.hash('admin123', 10),
      role: UserRole.ADMIN,
    },
    {
      username: 'uploader',
      password: await bcrypt.hash('upload123', 10),
      role: UserRole.UPLOADER,
    },
    {
      username: 'viewer',
      password: await bcrypt.hash('view123', 10),
      role: UserRole.VIEWER,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: user,
    });
    console.log(`Created/Updated user: ${user.username}`);
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

