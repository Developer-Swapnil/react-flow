import { useState } from "react";
import { Activity, Cpu, ServerCog } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Tabs } from "@/components/ui/Tabs";
import { Textarea } from "@/components/ui/Textarea";
import { SliderInput } from "@/components/inspector/SliderInput";
import { useAppStore } from "@/store/useAppStore";
import type { NodeData, ServiceNode } from "@/types";

type NodeInspectorProps = {
  selectedNode: ServiceNode | null;
  updateNodeData: (nodeId: string, patch: Partial<NodeData>) => void;
};

const toneForStatus = (status: NodeData["status"]) => {
  if (status === "Healthy") {
    return "green";
  }
  if (status === "Degraded") {
    return "yellow";
  }
  return "red";
};

export const NodeInspector = ({ selectedNode, updateNodeData }: NodeInspectorProps) => {
  const activeInspectorTab = useAppStore((state) => state.activeInspectorTab);
  const setActiveInspectorTab = useAppStore((state) => state.setActiveInspectorTab);
  const [draftName, setDraftName] = useState("");

  if (!selectedNode) {
    return (
      <section className="panel-section inspector-section empty">
        <div className="empty-inspector-icon">
          <ServerCog size={24} />
        </div>
        <strong>No node selected</strong>
        <span>Select a service card on the canvas to inspect and edit it.</span>
      </section>
    );
  }

  const data = selectedNode.data;
  const currentName = draftName || data.label;
  const persistName = () => {
    const nextName = currentName.trim();
    if (nextName) {
      updateNodeData(selectedNode.id, { label: nextName });
    }
    setDraftName("");
  };

  return (
    <section className="panel-section inspector-section">
      <div className="section-heading">
        <span>Node Inspector</span>
        <Badge tone={toneForStatus(data.status)}>{data.status}</Badge>
      </div>
      <div className="inspector-identity">
        <span className="service-icon large">{data.icon}</span>
        <div>
          <strong>{data.label}</strong>
          <span>{data.serviceType}</span>
        </div>
      </div>
      <Tabs
        onValueChange={setActiveInspectorTab}
        tabs={[
          {
            value: "config",
            label: "Config",
            content: (
              <div className="tab-stack">
                <label>
                  Node name
                  <Input
                    onBlur={persistName}
                    onChange={(event) => setDraftName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        persistName();
                      }
                    }}
                    value={currentName}
                  />
                </label>
                <label>
                  Capacity
                  <SliderInput
                    onChange={(sliderValue) => updateNodeData(selectedNode.id, { sliderValue })}
                    value={data.sliderValue}
                  />
                </label>
                <label>
                  Notes
                  <Textarea
                    onChange={(event) => updateNodeData(selectedNode.id, { description: event.target.value })}
                    rows={4}
                    value={data.description ?? ""}
                  />
                </label>
              </div>
            ),
          },
          {
            value: "runtime",
            label: "Runtime",
            content: (
              <div className="runtime-grid">
                <div>
                  <Activity size={18} />
                  <span>Status</span>
                  <strong>{data.status}</strong>
                </div>
                <div>
                  <Cpu size={18} />
                  <span>Utilization</span>
                  <strong>{data.sliderValue}%</strong>
                </div>
                <div>
                  <ServerCog size={18} />
                  <span>Region</span>
                  <strong>{data.region}</strong>
                </div>
                <div>
                  <ServerCog size={18} />
                  <span>Cost</span>
                  <strong>{data.cost}</strong>
                </div>
              </div>
            ),
          },
        ]}
        value={activeInspectorTab}
      />
    </section>
  );
};
