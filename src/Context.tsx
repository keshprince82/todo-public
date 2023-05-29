import { createContext } from 'react';
import { CurrentContextType } from './interface';

export const MyContext = createContext<CurrentContextType | any >("");