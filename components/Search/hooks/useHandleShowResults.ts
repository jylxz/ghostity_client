import { useEffect, useState } from "react";

export default function useHandleShowResults() {
  const [show, setShow] = useState<
    "all" | "reset" | "streams" | "profiles" | "games" | "organizations"
  >("all");
  const [showStreams, setShowStreams] = useState(true);
  const [showProfiles, setShowProfiles] = useState(true);
  const [showOrganizations, setShowOrganizations] = useState(true);
  const [showGames, setShowGames] = useState(true);

  useEffect(() => {
    if (show === "all") {
      setShowStreams(true);
      setShowProfiles(true);
      setShowOrganizations(true);
      setShowGames(true);
    }

    if (show !== "all") {
      setShowStreams(false);
      setShowProfiles(false);
      setShowOrganizations(false);
      setShowGames(false);
    }

    if (show === "streams") {
      setShowStreams(true);
    }

    if (show === "profiles") {
      setShowProfiles(true);
    }

    if (show === "organizations") {
      setShowOrganizations(true);
    }

    if (show === "games") {
      setShowGames(true);
    }
  }, [show]);

  return { showStreams, showProfiles, showOrganizations, showGames, setShow };
}
