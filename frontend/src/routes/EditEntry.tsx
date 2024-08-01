import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../contexts/EntryContext";
import dateToDefaultValueString from "../utilities/dateToDefaultValueString";

const EditEntry: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateEntry, entries, isLoading } = useContext(EntryContext) as EntryContextType;
  const [previousEntry, setPreviousEntry] = useState<Entry | null>(null);

  useEffect(() => {
    if (!isLoading) {
      const entry = entries.filter((entry) => entry.id == id)[0];
      setPreviousEntry(entry);
    }
  }, [entries, isLoading, id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newEntry: Entry = {
      id: previousEntry?.id,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      created_at: previousEntry?.created_at,
      scheduled_for: new Date(formData.get("scheduled_for") as string),
    };

    const entryAdded = await updateEntry(id as string, newEntry);
    if (entryAdded) {
      navigate("/");
    } else alert("Entry could not be saved correctly.");
  };

  return (
    previousEntry && (
      <section className="flex flex-col w-fit ml-auto mr-auto mt-10 gap-5 bg-gray-300 dark:bg-[#282828] rounded-md">
        <p className="text-xl px-8 pt-4">Edit entry details</p>
        <form
          className="flex justify-center flex-col w-fit ml-auto mr-auto gap-5 bg-gray-300 dark:bg-[#282828] px-8 pb-8 rounded-md"
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <input
            className="p-3 rounded-md dark:bg-[#282828] dark:border-solid dark:border-2 dark:border-[#35383f] text-black dark:text-white"
            type="text"
            placeholder="Title"
            name="title"
            defaultValue={previousEntry.title}
            required
          />
          <textarea
            className="p-3 rounded-md dark:bg-[#282828] dark:border-solid dark:border-2 dark:border-[#35383f] text-black dark:text-white"
            placeholder="Description"
            name="description"
            defaultValue={previousEntry.description}
            required
          />
          <label className="text-sm mb-[-1rem]" htmlFor="scheduled_for">
            Scheduled Date:
          </label>
          <input
            className="p-3 rounded-md dark:bg-[#282828] dark:border-solid dark:border-2 dark:border-[#35383f] text-black dark:text-white"
            type="date"
            name="scheduled_for"
            defaultValue={dateToDefaultValueString(new Date(previousEntry.scheduled_for))}
            required
          />
          <input
            className="bg-blue-400 hover:bg-blue-600 font-semibold text-white p-3 rounded-md cursor-pointer"
            type="submit"
            value="Edit"
          />
        </form>
      </section>
    )
  );
};

export default EditEntry;
