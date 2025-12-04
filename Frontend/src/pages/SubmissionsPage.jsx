import { useApp } from "../contexts/AppContext";
import { Link } from "lucide-react";

const SubmissionsPage = () => {
  const { submissions } = useApp();

  return (
    <div className="flex flex-col gap-6">
      <Link to="/problemset" className="flex items-center gap-2 text-[#1ba3ff] hover:underline mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 11H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Problemset
      </Link>
      <div className="bg-white rounded-2xl p-6 shadow-lg overflow-x-auto">
        <div className="flex items-center gap-2 text-gray-600 font-semibold mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
          one_unknown submissions
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">When</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Who</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Problem</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lang</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verdict</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memory</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissions.map((submission) => (
              <tr key={submission.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1ba3ff] hover:underline">
                  <Link to={`/submission/${submission.id}`}>{submission.id}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(submission.when).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1ba3ff]">{submission.who}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#1ba3ff] hover:underline">
                  <Link to={`/problem/${submission.problemId}`}>{submission.problem}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.lang}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                  <span className={
                    submission.verdict === "Accepted"
                      ? "text-[#0de84b]"
                      : "text-[#ff6863]"
                  }>
                    {submission.verdict}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.time} ms</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.memory} KB</td>
              </tr>
            ))}
          </tbody>
        </table>
        {submissions.length === 0 && (
          <div className="text-center py-6 text-gray-600">
            No submissions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionsPage;