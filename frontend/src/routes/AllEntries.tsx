import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import EntryCard from "../components/EntryCard";
import { EntryContext } from "../contexts/EntryContext";

const AllEntries: React.FC = () => {
  const { entries, deleteEntry } = useContext(EntryContext) as EntryContextType;
  const navigate = useNavigate();

  return entries.length === 0 ? (
    <section className="my-[200px]">
      <h1 className="text-center font-semibold text-4xl">You don't have any cards</h1>
      <p className="text-center font-medium text-md">
        Lets{" "}
        <Link className="text-blue-400 underline underline-offset-2" to="/create">
          Create One
        </Link>
      </p>
    </section>
  ) : (
    <section className={`flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4`}>
      {entries.map((entry: Entry) => (
        <EntryCard>
          <EntryCard.Title>{entry.title}</EntryCard.Title>
          <EntryCard.Description>{entry.description}</EntryCard.Description>
          <EntryCard.Dates createdAt={entry.created_at} scheduledFor={entry.scheduled_for} />
          <EntryCard.Controls
            onDelete={() => {
              deleteEntry(entry.id as string);
            }}
            onEdit={() => {
              navigate(`/edit/${entry.id}`);
            }}
          />
        </EntryCard>
      ))}
    </section>
  );
};

export default AllEntries;
