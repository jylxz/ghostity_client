import Head from "next/head";
import React from "react";
import axios from "axios";
import GameMain from "../../../components/Game/GameMain";

export async function getServerSideProps(context: { query: { game: string } }) {
  const { game } = context.query;
  const API = process.env.NEXT_PUBLIC_API as string;

  const gameData = await axios
    .get<Game>(`${API}/games/${encodeURIComponent(game)}`)
    .then((res) => res.data);

  if (!gameData) return { notFound: true };

  return { props: { gameData } };
}

export default function BrowseGameStreams({ gameData }: { gameData: Game }) {
  return (
    <>
      <Head>
        <title>vGhostity | {gameData.name}</title>
        <meta
          name="keywords"
          content={`V-Tubers, VTubers, virtual youtubers, Hololive, Nijisanji, VShojo, VSPO, Twitch, Youtube, V-Tuber directory, livestreams, games, ${gameData.name}`}
        />
      </Head>
      <GameMain gameData={gameData} />
    </>
  );
}
