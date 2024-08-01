import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Entry, EntryContextType } from "../@types/context";

const EntryContext = createContext<EntryContextType | null>(null);

const EntryContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initState = async () => {
    const data = await axios.get<Entry[]>("http://localhost:3001/get/");
    const initialStateBody = data.data;
    setEntries(initialStateBody);
    setIsLoading(false);
  };

  useEffect(() => {
    initState();
  }, []);

  const saveEntry = async (entry: Entry) => {
    try {
      const requestData = await axios.post<Entry>("http://localhost:3001/create/", entry);

      if (requestData.status === 200) {
        const newEntry = requestData.data;
        setEntries([...entries, newEntry]);
        return true;
      } else return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const updateEntry = async (id: string, entry: Entry) => {
    try {
      const res = await axios.put<Entry>(`http://localhost:3001/update/${id}`, entry);
      if (res.status === 200) {
        setEntries((entries) => {
          const entryIndex = entries.findIndex((obj) => obj.id == id);
          entries[entryIndex] = entry;
          return entries;
        });
        return true;
      } else return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const deleteEntry = async (id: string) => {
    await axios.delete<Entry>(`http://localhost:3001/delete/${id}`);
    setEntries((e) => e.filter((entry) => entry.id != id));
  };

  return (
    <EntryContext.Provider value={{ entries, saveEntry, updateEntry, deleteEntry, isLoading }}>
      {children}
    </EntryContext.Provider>
  );
};

export { EntryContext, EntryContextProvider };
