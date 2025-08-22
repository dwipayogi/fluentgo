"use client";

import { useEffect, useState } from "react";

interface AccuracySummaryProps {
  userId: number;
}

interface SummaryData {
  today_accuracy: number;
  today_questions: number;
  weekly_accuracy: number;
  weekly_questions: number;
}

export default function AccuracySummary({ userId }: AccuracySummaryProps) {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(`/api/accuracy-summary?user_id=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setSummary(data.data);
        }
      } catch (error) {
        console.error("Error fetching accuracy summary:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSummary();
    }
  }, [userId]);

  if (loading) {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  if (!summary) {
    return <div className="text-sm text-gray-500">No data available</div>;
  }

  // Calculate overall display
  const hasAnyData =
    summary.today_questions > 0 || summary.weekly_questions > 0;
  const displayAccuracy =
    summary.today_questions > 0
      ? summary.today_accuracy
      : summary.weekly_accuracy;

  return (
    <div className="space-y-2">
      {hasAnyData ? (
        <>
          <div className="text-2xl font-bold text-indigo-600">
            {displayAccuracy}% accuracy
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Today: {summary.today_accuracy}% ({summary.today_questions}{" "}
              questions)
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              This week: {summary.weekly_accuracy}% ({summary.weekly_questions}{" "}
              questions)
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-1">
          <div className="text-2xl font-bold text-gray-400">Start learning</div>
          <div className="text-sm text-gray-500">
            Complete some questions to see your accuracy
          </div>
        </div>
      )}
    </div>
  );
}
