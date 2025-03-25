"use client";

import { ConnectionDetails } from "@/lib/types";
import {
  formatChatMessageLinks,
  LiveKitRoom,
  LocalUserChoices,
  PreJoin,
  VideoConference,
} from "@livekit/components-react";
import {
  RoomOptions,
  VideoPresets,
  Room,
  RoomConnectOptions,
} from "livekit-client";
import { useRouter } from "next/navigation";
import { useState, useMemo, useCallback } from "react";

const CONN_DETAILS_ENDPOINT = "/api/connection-details";

export function PageClient(props: { roomName: string }) {
  const [preJoinChoices, setPreJoinChoices] = useState<
    LocalUserChoices | undefined
  >(undefined);
  const preJoinDefaults = useMemo(() => {
    return {
      username: "",
      videoEnabled: true,
      audioEnabled: true,
    };
  }, []);
  const [connectionDetails, setConnectionDetails] = useState<
    ConnectionDetails | undefined
  >(undefined);

  const handlePreJoinSubmit = useCallback(async (values: LocalUserChoices) => {
    setPreJoinChoices(values);
    const url = new URL(CONN_DETAILS_ENDPOINT, window.location.origin);
    url.searchParams.append("roomName", props.roomName);
    url.searchParams.append("participantName", values.username);
    const connectionDetailsResp = await fetch(url.toString());
    const connectionDetailsData = await connectionDetailsResp.json();
    setConnectionDetails(connectionDetailsData);
  }, []);

  return (
    <main
      data-lk-theme="default"
      className="bg-[#111] h-screen w-screen flex flex-col items-center justify-center"
    >
      {connectionDetails === undefined || preJoinChoices === undefined ? (
        <div className="grid place-items-center h-screen">
          <PreJoin defaults={preJoinDefaults} onSubmit={handlePreJoinSubmit} />
        </div>
      ) : (
        <VideoConferenceComponent
          connectionDetails={connectionDetails}
          userChoices={preJoinChoices}
        />
      )}
    </main>
  );
}

function VideoConferenceComponent(props: {
  userChoices: LocalUserChoices;
  connectionDetails: ConnectionDetails;
}) {
  const roomOptions = useMemo((): RoomOptions => {
    return {
      videoCaptureDefaults: {
        deviceId: props.userChoices.videoDeviceId ?? undefined,
        resolution: VideoPresets.h720,
      },
      publishDefaults: {
        dtx: false,
        videoSimulcastLayers: [VideoPresets.h540, VideoPresets.h216],
        red: true,
        videoCodec: "vp9",
      },
      audioCaptureDefaults: {
        deviceId: props.userChoices.audioDeviceId ?? undefined,
      },
      adaptiveStream: { pixelDensity: "screen" },
      dynacast: true,
    };
  }, [props.userChoices.videoDeviceId, props.userChoices.audioDeviceId]);

  const room = useMemo(() => new Room(roomOptions), []);

  const connectOptions = useMemo((): RoomConnectOptions => {
    return {
      autoSubscribe: true,
    };
  }, []);

  const router = useRouter();
  const handleOnLeave = useCallback(() => router.push("/"), [router]);

  return (
    <LiveKitRoom
      connect={true}
      room={room}
      token={props.connectionDetails.participantToken}
      serverUrl={props.connectionDetails.serverUrl}
      connectOptions={connectOptions}
      video={props.userChoices.videoEnabled}
      audio={props.userChoices.audioEnabled}
      onDisconnected={handleOnLeave}
    >
      <VideoConference chatMessageFormatter={formatChatMessageLinks} />
    </LiveKitRoom>
  );
}
