import type { AppSummary, GraphData, NodeStatus } from "@/types";

export const apps: AppSummary[] = [
  { id: "supertokens-golang", name: "supertokens-golang", icon: "Go", color: "#00add8" },
  { id: "supertokens-java", name: "supertokens-java", icon: "Jv", color: "#f97316" },
  { id: "supertokens-python", name: "supertokens-python", icon: "Py", color: "#3776ab" },
  { id: "supertokens-ruby", name: "supertokens-ruby", icon: "Rb", color: "#cc342d" },
  { id: "supertokens-go", name: "supertokens-go", icon: "Go", color: "#29b7cb" },
];

const statuses: NodeStatus[] = ["Healthy", "Degraded", "Down"];

export const createGraph = (appId: string): GraphData => {
  const offset = apps.findIndex((app) => app.id === appId);
  const statusFor = (index: number): NodeStatus => statuses[(Math.max(offset, 0) + index) % statuses.length];

  return {
    nodes: [
      {
        id: `${appId}-postgres`,
        type: "service",
        position: { x: 80, y: 120 },
        data: {
          id: `${appId}-postgres`,
          label: "Postgres",
          serviceType: "Database",
          icon: "Pg",
          status: statusFor(0),
          cost: "$0.03/HR",
          sliderValue: 72,
          region: "us-east-1",
          description: "Primary relational data store.",
        },
      },
      {
        id: `${appId}-redis`,
        type: "service",
        position: { x: 430, y: 70 },
        data: {
          id: `${appId}-redis`,
          label: "Redis",
          serviceType: "Cache",
          icon: "Rd",
          status: statusFor(1),
          cost: "$0.01/HR",
          sliderValue: 48,
          region: "us-east-1",
          description: "Session and rate-limit cache.",
        },
      },
      {
        id: `${appId}-mongo`,
        type: "service",
        position: { x: 410, y: 300 },
        data: {
          id: `${appId}-mongo`,
          label: "MongoDB",
          serviceType: "Document DB",
          icon: "Mg",
          status: statusFor(2),
          cost: "$0.04/HR",
          sliderValue: 61,
          region: "ap-south-1",
          description: "Document workload backing store.",
        },
      },
      {
        id: `${appId}-worker`,
        type: "service",
        position: { x: 760, y: 190 },
        data: {
          id: `${appId}-worker`,
          label: "Worker",
          serviceType: "Queue",
          icon: "Wk",
          status: statusFor(3),
          cost: "$0.02/HR",
          sliderValue: 35,
          region: "eu-west-1",
          description: "Background event processor.",
        },
      },
    ],
    edges: [
      { id: `${appId}-e1`, source: `${appId}-postgres`, target: `${appId}-redis`, animated: true },
      { id: `${appId}-e2`, source: `${appId}-postgres`, target: `${appId}-mongo` },
      { id: `${appId}-e3`, source: `${appId}-redis`, target: `${appId}-worker`, animated: true },
      { id: `${appId}-e4`, source: `${appId}-mongo`, target: `${appId}-worker` },
    ],
  };
};
