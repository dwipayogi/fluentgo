import * as React from "react";
import { PageClient } from "./PageClient";

export default function Page({ params }: { params: { roomName: string } }) {
  return <PageClient roomName={params.roomName} />;
}
