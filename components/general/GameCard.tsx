import React from 'react'
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Link from "next/link"

export default function GameCard({game}: {game: Game}) {
  return (
    <Card>
      <Link href={`/browse/games/${encodeURIComponent(game.name)}`} passHref>
        <CardMedia
          component="img"
          className="cursor-pointer"
          image={game.cover_img}
        />
      </Link>
      <CardContent className="h-16 mt-0 pt-2">
        <Link href={`/browse/games/${encodeURIComponent(game.name)}`} passHref>
          <Typography className="text-sm font-semibold line-clamp-1 cursor-pointer">
            {game.name}
          </Typography>
        </Link>
        <Typography className="text-sm text-gray-500">
          {game.viewers} viewers
        </Typography>
      </CardContent>
    </Card>
  );
}
