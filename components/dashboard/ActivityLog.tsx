import React from "react";

const ActivityLog: React.FC = () => {
  const activities = [
    { type: "Uploaded", fileType: "Image", time: "Nov 11, 10:10 PM" },
    { type: "Uploaded", fileType: "Document", time: "Nov 11, 9:30 PM" },
  ];

  return (
    <section className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Activity</h2>
      <ul className="space-y-2">
        {activities.map((activity, index) => (
          <li key={index} className="flex justify-between items-center">
            <div className="flex gap-2">
              <span className={`bg-accent-blue w-6 h-6 rounded-full`}></span>
              <p>
                {activity.type} a {activity.fileType}
              </p>
            </div>
            <span className="text-gray-600">{activity.time}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ActivityLog;
