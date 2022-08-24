import React from 'react';
import { YatiTreeStore } from './YatiTreeStore';

export default React.createContext<YatiTreeStore | null>(null);