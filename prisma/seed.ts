/**
 * EDITME: Change or reorder seed functions
 */

import bcrypt from "bcryptjs";

import { dataUserRoles } from "~/data";
import { prisma } from "~/libs";

async function seed() {
  await seedUsers();
}

/**
 * -----------------------------------------------------------------------------
 * Various seed functions
 * -----------------------------------------------------------------------------
 */

export async function seedUsers() {
  // ---------------------------------------------------------------------------
  console.info("Seed user roles...");
  await prisma.userRole.deleteMany();

  await prisma.userRole.createMany({
    data: dataUserRoles,
  });
  const adminUserRole = await prisma.userRole.findFirst({
    where: { symbol: "ADMIN" },
  });

  // ---------------------------------------------------------------------------
  console.info("Seed users...");
  await prisma.user.deleteMany();

  const { REMIX_ADMIN_EMAIL, REMIX_ADMIN_PASSWORD } = process.env;

  const hashedPassword = await bcrypt.hash(String(REMIX_ADMIN_PASSWORD), 10);

  const user = await prisma.user.create({
    data: {
      email: String(REMIX_ADMIN_EMAIL),
      name: "Admin",
      username: "admin",
      phone: "+1234567890",
      password: { create: { hash: hashedPassword } },
      roleId: adminUserRole?.id,
    },
  });

  // ---------------------------------------------------------------------------
  console.info("Seed notes...");

  await prisma.note.create({
    data: { title: "My 1st title", body: "The 1st body", userId: user.id },
  });
  await prisma.note.create({
    data: { title: "My 2nd title", body: "The 2nd body", userId: user.id },
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
