import { ReactNode } from "react";

type EntryCardProps = { children: ReactNode };
type EntryCardTitleProps = { children: ReactNode };
type EntryCardDescriptionProps = { children: ReactNode };
type EntryCardControlsProps = { onDelete: () => void; onEdit: () => void };
type EntryCardDatesProps = { createdAt: Date; scheduledFor: Date };
type EntryCardType = React.FC<EntryCardProps> & {
  Title: React.FC<EntryCardTitleProps>;
  Description: React.FC<EntryCardDescriptionProps>;
  Controls: React.FC<EntryCardControlsProps>;
  Dates: React.FC<EntryCardDatesProps>;
};
const EntryCard: EntryCardType = ({ children }) => {
  return (
    <div className="bg-gray-300 dark:bg-gradient-to-b dark:from-[#282828] dark:to-[#35383f] dark:border-2 dark:border-solid dark:border-[#35383f] shadow-md shadow-gray-500 dark:shadow-none m-3 p-4 rounded-lg flex flex-col justify-between">
      {children}
    </div>
  );
};

const EntryCardTitle: React.FC<EntryCardTitleProps> = ({ children }) => {
  return <h1 className="font-bold text-sm md:text-lg">{children}</h1>;
};

const EntryCardDescription: React.FC<EntryCardDescriptionProps> = ({ children }) => {
  return <p className="text-left text-lg font-light md:mt-2 md:mb-4 mt-1 mb-3">{children}</p>;
};

const EntryCardControls: React.FC<EntryCardControlsProps> = ({ onDelete, onEdit }) => {
  return (
    <div className="flex justify-center">
      <button onClick={onDelete} className="m-1 md:m-2 p-1 font-semibold rounded-md bg-red-500 hover:bg-red-700">
        ✖
      </button>
      <button onClick={onEdit} className="m-1 md:m-2 p-1 font-semibold rounded-md bg-blue-500 hover:bg-blue-700">
        🖊
      </button>
    </div>
  );
};

const EntryCardDates: React.FC<EntryCardDatesProps> = ({ createdAt, scheduledFor }) => {
  return (
    <>
      <p className="text-xs sm:text-sm md:text-md lg:text-lg">
        Created On: <time className="text-right text-sm md:text-lg">{new Date(createdAt).toLocaleDateString()}</time>
      </p>
      <p className="text-xs sm:text-sm md:text-md lg:text-lg">
        Scheduled For:{" "}
        <time className="text-right text-sm md:text-lg">{new Date(scheduledFor).toLocaleDateString()}</time>
      </p>
    </>
  );
};

EntryCard.Title = EntryCardTitle;
EntryCard.Description = EntryCardDescription;
EntryCard.Controls = EntryCardControls;
EntryCard.Dates = EntryCardDates;

export default EntryCard;
