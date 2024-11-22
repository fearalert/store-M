import React from "react";

const StorageInfo: React.FC = () => {
  const categories = [
    { name: "Documents", size: "12 GB", color: "accent-red" },
    { name: "Images", size: "12 GB", color: "accent-blue" },
    { name: "Video", size: "12 GB", color: "accent-green" },
    { name: "Others", size: "12 GB", color: "accent-yellow" },
  ];

  return (
    <section className="flex flex-col gap-4">
      <div className="bg-primary p-6 rounded-lg shadow-md">
        <h2 className="text-xl text-white font-semibold mb-4">Storage Usage</h2>
        <div className="flex items-center gap-4">
          <div className="w-32 h-32 rounded-full border-8 border-primary border-opacity-50 flex items-center justify-center">
            <p className="text-lg text-white font-bold">80% Used</p>
          </div>
          <div>
            <h5 className="text-text font-bold">Available Storage:</h5>
            <h3 className="text-2xl font-semibold text-text-half" >20 GB / 100 GB</h3>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`p-4 bg-${category.color} text-white rounded-md`}
          >
            <h3 className="text-lg">{category.name}</h3>
            <p>{category.size}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StorageInfo;
