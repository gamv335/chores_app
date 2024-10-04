import * as React from 'react';
import { createContext, useState, ReactNode, useContext } from 'react'; 

// Define the types for Chore and the context
export type Chore = {
  title: string;
  description?: string;
  deadlineDate?: string; // Add the deadline date
  deadlineTime?: string; // Add the deadline time
};

type ChoreContextType = {
  chores: Chore[];
  addChore: (chore: Chore) => void;
  setChores: React.Dispatch<React.SetStateAction<Chore[]>>;  // Add setChores here
};

// Create the context
const ChoreContext = createContext<ChoreContextType | undefined>(undefined);

export const ChoreProvider = ({ children }: { children: ReactNode }) => {
  const [chores, setChores] = useState<Chore[]>([
    { title: 'Do the dishes' },
    { title: 'Sweep the floor' },
  ]);

  const addChore = (chore: Chore) => {
    setChores([...chores, chore]);
  };

  return (
    <ChoreContext.Provider value={{ chores, addChore, setChores }}>
      {children}
    </ChoreContext.Provider>
  );
};

// Custom hook to use the ChoreContext
export const useChores = () => {
  const context = useContext(ChoreContext);
  if (!context) {
    throw new Error('useChores must be used within a ChoreProvider');
  }
  return context;
};
