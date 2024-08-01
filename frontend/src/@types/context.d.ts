export interface Entry {
  id?: string;
  title: string;
  description: string;
  created_at: Date;
  scheduled_for: Date;
}
export type EntryContextType = {
  entries: Entry[];
  saveEntry: (entry: Entry) => Promise<boolean>;
  updateEntry: (id: string, entryData: Entry) => Promise<boolean>;
  deleteEntry: (id: string) => void;
  isLoading: boolean;
};

export type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};
