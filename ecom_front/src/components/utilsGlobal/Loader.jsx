import React, { useEffect, useState } from 'react';

const Loader = (props) => {

  const [color, setColor] = useState(true);

  useEffect(() => {

    if (props.color == "white") {

      setColor(false);
    }
  }, [])



  return (
    <div className="flex justify-center items-center mt-10 py-5">
      <div className="spinner-border animate-spin inline-block w-10 h-30 border-2 rounded-full border-black" role="status">

      </div>
      {
        color ? (
          <p className='text-black ml-2'>{props.title}</p>

        ) : (
          <p className='text-white ml-2'>{props.title}</p>

        )
      }
    </div>
  );
};

export default Loader;
