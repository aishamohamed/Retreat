/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {/* Render content when loading is finished */}
        </div>
      )}
    </div>
  );
}

export default MyComponent;
