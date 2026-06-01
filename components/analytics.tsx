"use client";

import { useEffect } from "react";

import { initClarity } from "@/lib/clarity";

interface AnalyticsProps {
  projectId?: string;
}

const Analytics = ({ projectId }: AnalyticsProps) => {
  useEffect(() => {
    if (projectId) {
      initClarity(projectId);
    }
  }, [projectId]);

  return null;
};

export { Analytics };
