/**
 * EDITME: Change or reorder seed functions
 */

import bcrypt from "bcryptjs";
import invariant from "tiny-invariant";

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
  invariant(adminUserRole, "User Role with symbol ADMIN is not found");

  // ---------------------------------------------------------------------------
  console.info("Seed users...");
  await prisma.user.deleteMany();

  const { REMIX_ADMIN_EMAIL, REMIX_ADMIN_PASSWORD } = process.env;
  invariant(REMIX_ADMIN_EMAIL, "REMIX_ADMIN_EMAIL must be set");
  invariant(REMIX_ADMIN_PASSWORD, "REMIX_ADMIN_PASSWORD must be set");

  const hashedPassword = await bcrypt.hash(REMIX_ADMIN_PASSWORD, 10);

  const user = await prisma.user.create({
    data: {
      email: REMIX_ADMIN_EMAIL,
      password: { create: { hash: hashedPassword } },
      name: "Admin",
      username: "admin",
      phone: "+1234567890",
      role: { connect: { id: adminUserRole.id } },
      profile: {
        create: { headline: "I am Admin", bio: "The admin of this app." },
      },
    },
  });

  // ---------------------------------------------------------------------------
  console.info("Seed notes...");

  await prisma.note.create({
    data: {
      slug: "my-1st-title-12345",
      title: "My 1st title",
      description: "",
      content: "The 1st content",
      user: { connect: { id: user.id } },
    },
  });
  await prisma.note.create({
    data: {
      slug: "my-2nd-title-67890",
      title: "My 2nd title",
      description: "",
      content: "The 2nd content",
      user: { connect: { id: user.id } },
    },
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
