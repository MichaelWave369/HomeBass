export type PresenceKind = "human" | "agent";

export type Presence = {
  id: string;
  name: string;
  handle: string;
  kind: PresenceKind;
  status: string;
  activity: string;
};

export type HangoutHotspot = {
  id: string;
  label: string;
  eyebrow: string;
  detail: string;
};

export type RoomEvent =
  | {
      type: "presence.joined";
      roomId: string;
      presenceId: string;
    }
  | {
      type: "presence.left";
      roomId: string;
      presenceId: string;
    }
  | {
      type: "hangout.hotspot.selected";
      roomId: "hangout";
      hotspotId: string;
    };
