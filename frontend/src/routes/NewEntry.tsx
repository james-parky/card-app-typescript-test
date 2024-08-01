import { FormEvent, useContext, useRef } from "react";

import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../contexts/EntryContext";

export default function NewEntry() {
  const { saveEntry } = useContext(EntryContext) as EntryContextType;

  const newEntryFormRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newEntry: Entry = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      scheduled_for: new Date(formData.get("scheduled_for") as string),
    };
    const entryAdded = await saveEntry(newEntry);
    if (entryAdded) {
      newEntryFormRef?.current?.reset();
    } else alert("Entry could not be saved correctly.");
  };

  return (
    <section className="flex flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 dark:bg-[#282828] rounded-md">
      <p className="text-xl px-8 pt-4">Enter entry details</p>
      <form
        className="flex justify-center flex-col w-fit ml-auto mr-auto gap-5 bg-gray-300 dark:bg-[#282828] px-8 pb-8 rounded-md"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        ref={newEntryFormRef}
      >
        <input
          className="p-3 rounded-md dark:bg-[#282828] dark:border-solid dark:border-2 dark:border-[#35383f] text-black dark:text-white"
          type="text"
          placeholder="Title"
          name="title"
          required
        />
        <textarea
          className="p-3 rounded-md dark:bg-[#282828] dark:border-solid dark:border-2 dark:border-[#35383f] text-black dark:text-white"
          placeholder="Description"
          name="description"
          required
        />
        <label className="text-sm mb-[-1rem]" htmlFor="scheduled_for">
          Scheduled Date:
        </label>
        <input
          className="p-3 rounded-md dark:bg-[#282828] dark:border-solid dark:border-2 dark:border-[#35383f] text-black dark:text-white"
          type="date"
          name="scheduled_for"
          required
        />
        <input
          className="bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md cursor-pointer"
          type="submit"
          value="Create"
        />
      </form>
    </section>
  );
}
