import { LocalAudioTrack, LocalVideoTrack } from 'livekit-client';

export interface SessionProps {
  roomName: string;
  identity: string;
  audioTrack?: LocalAudioTrack;
  videoTrack?: LocalVideoTrack;
  region?: string;
  turnServer?: RTCIceServer;
  forceRelay?: boolean;
}

export interface TokenResult {
  identity: string;
  accessToken: string;
}

export type ConnectionDetails = {
  serverUrl: string;
  roomName: string;
  participantName: string;
  participantToken: string;
};

export type Room = {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  password?: string;
  started_at: Date;
  ended_at: Date;
}