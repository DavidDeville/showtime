import React from 'react';

/**
 * Defines the data form for the context
 */
export default React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value) => {}
});