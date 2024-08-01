import { useState } from "react";
import SettingsDialog from "./SettingsDialog";
import SettingsDialogToggle from "./SettingsDialogToggle";

const Header = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <header className="flex items-center justify-between m-3">
      <h1 className="text-3xl font-bold">Todo List</h1>
      <SettingsDialogToggle
        toggle={() => {
          setIsDialogOpen(!isDialogOpen);
        }}
      />
      {isDialogOpen && (
        <SettingsDialog
          onMouseLeave={() => {
            setIsDialogOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
