import React from "react";

export default function RecentActivity({ activity }) {
  return (
    <ul role="list" className="divide-y divide-gray-800">
      {activity &&
        activity.map((activity) => (
          <li
            key={activity.id}
            className="flex justify-between gap-x-6 px-4 py-4 sm:px-6 sm:py-6 lg:px-8"
          >
            <div className="flex min-w-0 gap-x-4">
              {activity.first_image_url && (
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-800"
                  src={activity.first_image_url}
                  alt=""
                />
              )}
              <a href={`/fishing_component/{activity.id}`}>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-white">
                    {activity.name}
                  </p>
                </div>
              </a>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="mt-1 text-xs leading-5 text-gray-400">
                {activity.created_at}
              </p>
            </div>
          </li>
        ))}
    </ul>
  );
}
