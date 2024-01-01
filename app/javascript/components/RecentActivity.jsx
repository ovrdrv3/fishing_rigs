import React from "react";

export default function RecentActivity({ activity }) {
  return (
    <aside className="dark:bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l dark:lg:border-white/5">
      <header className="flex items-center justify-between border-b dark:border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 dark:text-white">
          Activity feed
        </h2>
        <a href="#" className="text-sm font-semibold leading-6 text-indigo-400">
          View all
        </a>
      </header>
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
                    <p className="text-sm font-semibold leading-6 dark:text-white">
                      {activity.part_name}
                    </p>
                  </div>
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm leading-6 dark:text-white">
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
    </aside>
  );
}
