import { createContext, useContext, useState } from 'react';

const EditModeContext = createContext();

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error('useEditMode must be used within EditModeProvider');
  }
  return context;
};

export const EditModeProvider = ({ children }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [user] = useState({
    name: 'ישראל ישראלי',
    role: 'מנהל',
    isAdmin: true // Simulated admin status
  });

  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
  };

  return (
    <EditModeContext.Provider value={{ isEditMode, toggleEditMode, user }}>
      {children}
    </EditModeContext.Provider>
  );
};
