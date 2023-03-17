/**
 * EDITME: Seed
 *
 * Change or reorder seed functions
 */

// Important to import external libraries directly
import bcrypt from "bcryptjs";
import invariant from "tiny-invariant";

import { dataUserRoles } from "~/data";
import { createNoteSlug } from "~/helpers";
import { prisma } from "~/libs";

async function seed() {
  await seedUsers();
  await seedNotes();
}

/**
 * -----------------------------------------------------------------------------
 * Various seed functions
 * -----------------------------------------------------------------------------
 */

export async function seedUsers() {
  // ---------------------------------------------------------------------------
  console.info("Seed user roles...");
  await prisma.userRole.deleteMany(); // will cascade delete users and notes

  await prisma.userRole.createMany({
    data: dataUserRoles,
  });

  const adminUserRole = await prisma.userRole.findFirst({
    where: { symbol: "ADMIN" },
  });
  invariant(adminUserRole, "User Role with symbol ADMIN is not found");

  // ---------------------------------------------------------------------------
  console.info("Seed users...");

  const { REMIX_ADMIN_EMAIL, REMIX_ADMIN_PASSWORD } = process.env;
  invariant(REMIX_ADMIN_EMAIL, "REMIX_ADMIN_EMAIL must be set");
  invariant(REMIX_ADMIN_PASSWORD, "REMIX_ADMIN_PASSWORD must be set");

  const hashedPassword = await bcrypt.hash(REMIX_ADMIN_PASSWORD, 10);

  const user = await prisma.user.create({
    data: {
      email: REMIX_ADMIN_EMAIL,
      password: { create: { hash: hashedPassword } },
      name: "Rewinds Admin",
      username: "administrator",
      phone: "+1234567890",
      role: { connect: { id: adminUserRole.id } },
      profile: {
        create: {
          headline: "I am Admin",
          bio: "The administrator of this app.",
        },
      },
    },
  });
  invariant(user, "User with role symbol ADMIN is failed to create");
}

export async function seedNotes() {
  // ---------------------------------------------------------------------------
  console.info("Seed notes...");
  await prisma.note.deleteMany();

  const user = await prisma.user.findFirst({
    where: { role: { symbol: "ADMIN" } },
  });
  invariant(user, "User with role symbol ADMIN is not found");

  const note1 = {
    title: "The first note",
    description: "Description about the note",
    content: "This is the first note content that is for a demo.",
    user: { connect: { id: user.id } },
  };

  await prisma.note.create({
    data: {
      slug: createNoteSlug({
        title: note1.title,
        username: user.username,
      }),
      ...note1,
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
