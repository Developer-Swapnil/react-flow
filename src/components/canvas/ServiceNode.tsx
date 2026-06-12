import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Settings } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { NodeData, ServiceNode } from "@/types";

const toneForStatus = (status: NodeData["status"]) => {
  if (status === "Healthy") {
    return "green";
  }
  if (status === "Degraded") {
    return "yellow";
  }
  return "red";
};

export const ServiceNodeCard = ({ data, selected }: NodeProps<ServiceNode>) => (
  <div className={selected ? "service-node selected" : "service-node"}>
    <Handle className="node-handle" position={Position.Left} type="target" />
    <div className="service-node-header">
      <div className="service-title">
        <span className="service-icon">{data.icon}</span>
        <div>
          <strong>{data.label}</strong>
          <span>{data.serviceType}</span>
        </div>
      </div>
      <div className="node-actions">
        <span className="cost-badge">{data.cost}</span>
        <Settings size={15} />
      </div>
    </div>
    <div className="metric-tabs">
      <span>CPU</span>
      <span>Memory</span>
      <span>Disk</span>
      <span>Region</span>
    </div>
    <div className="node-slider-row">
      <div className="node-slider-track">
        <span style={{ width: `${data.sliderValue}%` }} />
      </div>
      <strong>{data.sliderValue}</strong>
    </div>
    <div className="service-node-footer">
      <Badge tone={toneForStatus(data.status)}>{data.status}</Badge>
      <span className="aws-mark">AWS</span>
    </div>
    <Handle className="node-handle" position={Position.Right} type="source" />
  </div>
);
