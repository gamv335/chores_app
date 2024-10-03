import * as React from 'react';
import { createContext, useState, ReactNode, useContext } from 'react'; 

// Define the types for Chore and the context
export type Chore = {
  title: string;
  description?: string;
};

type ChoreContextType = {
  chores: Chore[];
  addChore: (chore: Chore) => void;
};

// Create the context
const ChoreContext = createContext<ChoreContextType | undefined>(undefined);

export const ChoreProvider = ({ children }: { children: ReactNode }) => {
  const [chores, setChores] = useState<Chore[]>([
    { title: 'Do the dishes' },
    { title: 'Sweep the floor' },
  ]);

  const addChore = (chore: Chore) => {
    setChores((prevChores) => [...prevChores, chore]); // Use functional form
  };  

  return (
    <ChoreContext.Provider value={{ chores, addChore }}>
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
