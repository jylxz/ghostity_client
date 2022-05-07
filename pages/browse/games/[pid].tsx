import { useRouter } from "next/router";

const game = () => {
  const router = useRouter();
  const { pid } = router.query;

  return <>Game: {pid}</>;
};

export default game;
