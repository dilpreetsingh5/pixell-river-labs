import { PrismaClient } from "@prisma/client";
import { departments } from "../src/api/v1/data/departments";
import { organization } from "../src/api/v1/data/Organization";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction([
    prisma.employee.deleteMany(),
    prisma.role.deleteMany(),
    prisma.department.deleteMany()
  ]);

  for (const department of departments) {
    await prisma.department.create({
      data: {
        name: department.name,
        employees: {
          create: department.employees.map((employee) => ({
            firstName: employee.firstName,
            lastName: employee.lastName
          }))
        }
      }
    });
  }

  await prisma.role.createMany({
    data: organization.map((person) => ({
      firstName: person.firstName,
      lastName: person.lastName,
      role: person.role
    })),
    skipDuplicates: true
  });
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
