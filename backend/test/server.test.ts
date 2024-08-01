import { Entry } from "@prisma/client";
import Prisma from "../src/db";
import { prismaMock } from "./prisma_mock";

const createEntry = async (entry: Entry) => {
  try {
    const createdEntryData = await Prisma.entry.create({ data: entry });
    return createdEntryData
      ? { status: 200, createdEntryData }
      : { status: 500, msg: "Error creating entry" };
  } catch {
    return { status: 500, msg: "Error creating entry" };
  }
};

const readManyEntries = async () => {
  try {
    const entries = await Prisma.entry.findMany();
    return entries
      ? { status: 200, entries }
      : { status: 500, msg: "Error reading entries" };
  } catch {
    return { status: 500, msg: "Error reading entries" };
  }
};

const readEntry = async (id: string) => {
  try {
    const entry = await Prisma.entry.findUnique({ where: { id: id } });
    return entry
      ? { status: 200, entry }
      : { status: 500, msg: "Error reading entry" };
  } catch {
    return { status: 500, msg: "Error reading entry" };
  }
};

const updateEntry = async (id: string, entry: Entry) => {
  try {
    const updatedEntry = await Prisma.entry.update({
      data: entry,
      where: { id: id },
    });
    return updatedEntry
      ? { status: 200, updatedEntry }
      : { status: 500, msg: "Error updating entry" };
  } catch {
    return { status: 500, msg: "Error updating entry" };
  }
};

const deleteEntry = async (id: string) => {
  try {
    const deletedEntry = await Prisma.entry.delete({ where: { id: id } });
    return deletedEntry
      ? { status: 200, deletedEntry }
      : { status: 500, msg: "Error deleting entry" };
  } catch {
    return { status: 500, msg: "Error deleting entry" };
  }
};

describe("creating an entry", () => {
  it("should create a new entry with complete and valid data", async () => {
    const entry = {
      title: "Test Entry",
      description: "Test Description",
      scheduled_for: new Date(),
    };

    prismaMock.entry.create.mockResolvedValue(entry as Entry);

    await expect(createEntry(entry as Entry)).resolves.toEqual({
      status: 200,
      createdEntryData: entry,
    });
  });

  it("should throw an error if a requried field is missing", async () => {
    const entry = {
      description: "Test Description",
      scheduled_for: new Date(),
    };

    prismaMock.entry.create.mockImplementation();

    await expect(createEntry(entry as Entry)).resolves.toEqual({
      status: 500,
      msg: "Error creating entry",
    });
  });
});

describe("reading entries", () => {
  var existingEntry: Entry;

  beforeEach(async () => {
    const entry = {
      title: "Test Entry",
      description: "Test Description",
      scheduled_for: new Date(),
    };

    prismaMock.entry.create.mockResolvedValue(
      { ...entry, id: "generated_uuid", created_at: new Date() },
    );

    existingEntry = await Prisma.entry.create({ data: entry });
  });

  it("should read all entries", async () => {
    prismaMock.entry.findMany.mockResolvedValue([existingEntry]);

    await expect(readManyEntries()).resolves.toEqual({
      status: 200,
      entries: [existingEntry],
    });
  });

  it("should read a unique entry using uuid", async () => {
    prismaMock.entry.findUnique.mockResolvedValue(existingEntry);

    await expect(readEntry("generated_uuid")).resolves.toEqual({
      status: 200,
      entry: existingEntry,
    });
  });

  it("should error when trying to read with a non-existant uuid", async () => {
    prismaMock.entry.findUnique.mockResolvedValue(null);

    await expect(readEntry("non_existant_uuid")).resolves.toEqual({
      status: 500,
      msg: "Error reading entry",
    });
  });
});

describe("updating an entry", () => {
  var existingEntry: Entry;

  beforeEach(async () => {
    const entry = {
      title: "Test Entry",
      description: "Test Description",
      scheduled_for: new Date(),
    };
    prismaMock.entry.create.mockResolvedValue(
      { ...entry, id: "generated_uuid", created_at: new Date() },
    );

    existingEntry = await Prisma.entry.create({ data: entry });
  });

  afterEach(async () => {
    prismaMock.entry.deleteMany();
    await Prisma.entry.deleteMany();
  });

  it("should update an entry with new, correct, and valid data", async () => {
    const entry = {
      title: "Test Entry",
      description: "Changed Description",
    };

    prismaMock.entry.update.mockResolvedValue(entry as Entry);

    await expect(updateEntry("generated_uuid", entry as Entry)).resolves
      .toEqual({
        status: 200,
        updatedEntry: entry,
      });
  });

  it("should throw an error if the supplied uuid is not present", async () => {
    const entry = {
      description: "Test Description",
      scheduled_for: new Date(),
    };

    prismaMock.entry.update.mockImplementation();

    await expect(updateEntry("non_existent_uuid", entry as Entry)).resolves
      .toEqual({
        status: 500,
        msg: "Error updating entry",
      });
  });
});

describe("deleting an entry", () => {
  var existingEntry: Entry;

  beforeEach(async () => {
    const entry = {
      title: "Test Entry",
      description: "Test Description",
      scheduled_for: new Date(),
    };
    prismaMock.entry.create.mockResolvedValue(
      { ...entry, id: "generated_uuid", created_at: new Date() } as Entry,
    );

    existingEntry = await Prisma.entry.create({ data: entry });
  });

  afterEach(async () => {
    prismaMock.entry.deleteMany();
    await Prisma.entry.deleteMany();
  });

  it("should correctly delete a record with the matching uuid", async () => {
    const entry = {
      title: "Test Entry",
      description: "Changed Description",
    };

    prismaMock.entry.delete.mockResolvedValue(entry as Entry);

    await expect(deleteEntry("generated_uuid")).resolves
      .toEqual({
        status: 200,
        deletedEntry: entry,
      });
  });

  it("should throw an error if the supplied uuid is not present", async () => {
    prismaMock.entry.delete.mockImplementation();

    await expect(deleteEntry("non_existent_uuid")).resolves
      .toEqual({
        status: 500,
        msg: "Error deleting entry",
      });
  });
});
