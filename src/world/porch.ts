export type PorchPresence = {
  id: string;
  name: string;
  kind: "human" | "agent";
  status: "HERE" | "PASSING THROUGH" | "AFK";
};

export type PorchNodeStatus = {
  nodeName: string;
  mode: "LOCAL";
  transport: "FIXTURE";
  peers: PorchPresence[];
};

export const porchNodeFixture: PorchNodeStatus = {
  nodeName: "HOMEBASE",
  mode: "LOCAL",
  transport: "FIXTURE",
  peers: [
    {
      id: "vessie",
      name: "Vessie",
      kind: "agent",
      status: "HERE",
    },
    {
      id: "fieldliaison",
      name: "Field Liaison",
      kind: "agent",
      status: "PASSING THROUGH",
    },
  ],
};
