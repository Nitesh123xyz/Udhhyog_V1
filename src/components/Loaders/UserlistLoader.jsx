const UserlistLoader = ({ rows = 3 }) => {
  return (
    <tbody className="divide-y divide-[var(--border)]" aria-hidden="true">
      {Array.from({ length: rows }).map((_, rIdx) => (
        <tr key={`skele-row-${rIdx}`} className="animate-pulse">
          {/* emp_id */}
          <td className="px-3 py-4 whitespace-nowrap text-xs rounded-l-2xl">
            <div className="h-4 w-8 rounded bg-gray-200 dark:bg-gray-700" />
          </td>

          {/* avatar + name */}
          <td className="px-0 py-4 whitespace-nowrap">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="flex-1">
                <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700 mb-1" />
                <div className="h-2 w-20 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </td>

          {/* job_title */}
          <td className="px-3 py-4 whitespace-nowrap text-xs">
            <div className="h-3 w-28 rounded bg-gray-200 dark:bg-gray-700" />
          </td>

          {/* department */}
          <td className="px-4 py-4 whitespace-nowrap text-xs">
            <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          </td>

          {/* salary */}
          <td className="px-6 py-4 whitespace-nowrap text-xs font-medium">
            <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          </td>

          {/* joining_date */}
          <td className="px-8 py-4 whitespace-nowrap text-xs">
            <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          </td>

          {/* employment_type */}
          <td className="px-5 py-4 whitespace-nowrap text-xs">
            <div className="h-3 w-28 rounded bg-gray-200 dark:bg-gray-700" />
          </td>

          {/* status */}
          <td className="px-0 py-4 whitespace-nowrap rounded-r-2xl">
            <div className="h-6 w-12 rounded bg-gray-200 dark:bg-gray-700" />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default UserlistLoader;
