import React from "react";

const AudioBookPlayer = () => {
  return (
    <div className="w-80 mx-auto bg-white shadow-lg rounded-lg p-4">
      <div className="flex justify-center">
        <img
          src="https://via.placeholder.com/150" 
          alt="Audiobook Cover" 
          className="w-48 h-48 rounded-lg shadow-md"
        />
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-lg font-bold text-gray-800">We Who Wrestle with God</h2>
        <p className="text-sm text-gray-600 mt-1">Jordan B. Peterson</p>
      </div>

      <div className="mt-4 text-center">
        <button className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600">
          Get this title
        </button>
      </div>

      <div className="mt-4 text-center text-gray-600 text-sm">
        <p>Sample: We Who Wrestle with God</p>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-600">
          <span>00:01</span>
          <span>5m 1s left</span>
          <span>-05:01</span>
        </div>
        <div className="mt-2 bg-gray-300 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full w-1/4"></div>
        </div>
      </div>

      <div className="mt-4 flex justify-center items-center space-x-6">
        <button className="text-gray-500 hover:text-gray-800">
          <span className="material-icons">replay_30</span>
        </button>
        <button className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:bg-blue-600">
          <span className="material-icons text-2xl">play_arrow</span>
        </button>
        <button className="text-gray-500 hover:text-gray-800">
          <span className="material-icons">forward_30</span>
        </button>
      </div>

      <div className="mt-6 flex justify-around text-sm text-gray-600">
        <div className="text-center">
          <p className="font-bold">1.0x</p>
          <p>Narration speed</p>
        </div>
        <div className="text-center">
          <span className="material-icons">format_list_bulleted</span>
          <p>Chapters</p>
        </div>
        <div className="text-center">
          <span className="material-icons">bookmark_border</span>
          <p>Add a bookmark</p>
        </div>
      </div>
    </div>
  );
};

export default AudioBookPlayer;
