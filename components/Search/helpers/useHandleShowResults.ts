import { useEffect, useState } from "react";

export type ShowResultsOptions =
  | "all"
  | "none"
  | "streams"
  | "profiles"
  | "games"
  | "organizations";

export default function useHandleShowResults() {
  const [showing, setShow] = useState<ShowResultsOptions>("all");
  const [showStreams, setShowStreams] = useState(true);
  const [showProfiles, setShowProfiles] = useState(true);
  const [showOrganizations, setShowOrganizations] = useState(true);
  const [showGames, setShowGames] = useState(true);

  useEffect(() => {
    if (showing === "all") {
      setShowStreams(true);
      setShowProfiles(true);
      setShowOrganizations(true);
      setShowGames(true);
    }

    if (showing !== "all") {
      setShowStreams(false);
      setShowProfiles(false);
      setShowOrganizations(false);
      setShowGames(false);
    }

    if (showing === "streams") {
      setShowStreams(true);
    }

    if (showing === "profiles") {
      setShowProfiles(true);
    }

    if (showing === "organizations") {
      setShowOrganizations(true);
    }

    if (showing === "games") {
      setShowGames(true);
    }
  }, [showing]);

  return { showStreams, showProfiles, showOrganizations, showGames, showing, setShow };
}
