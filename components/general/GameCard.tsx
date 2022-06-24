import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import LinkTo from "./LinkTo";

export default function GameCard({ game }: { game: Game }) {
  return (
    <Card className="sm:w-52 select-none">
      <LinkTo href={`/browse/games/${encodeURIComponent(game.name)}`}>
        <Image src={game.cover_img} width="208" height="280" alt={`${game.name} cover art`}/>
      </LinkTo>
      <CardContent className="h-16 pt-2 bg-slate-50">
        <LinkTo href={`/#browse/games/${encodeURIComponent(game.name)}`}>
          <Typography className="text-sm font-semibold line-clamp-1 cursor-pointer">
            {game.name}
          </Typography>
        </LinkTo>
        <Typography className="text-sm text-gray-500">
          {game.viewers} viewers
        </Typography>
      </CardContent>
    </Card>
  );
}
