import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import UserContext from "@contexts/UserContext";
import ModelWrapper from "@general/ModalWrapper";
import AnimatedButton from "@general/AnimatedButton";
import { auth } from "@services/Firebase";

function PfpCards({
  src,
  setCurrentPfp,
}: {
  src: string;
  setCurrentPfp: Dispatch<SetStateAction<string>>;
}) {
  return (
    <button
      type="button"
      className="w-9 h-9"
      onClick={() => setCurrentPfp(src)}
    >
      <Image
        alt="A vGhostity profile icon option"
        src={src}
        width={36}
        height={36}
        className="text-xs"
      />
    </button>
  );
}

export default function AccountChangePfp({
  setEditPfp,
}: {
  setEditPfp: Dispatch<SetStateAction<boolean>>;
}) {
  const user = useContext(UserContext);
  const [currentPfp, setCurrentPfp] = useState<string>(
    user?.photoURL as string
  );
  const profileIconLinks = [
    "https://res.cloudinary.com/ghostity/image/upload/v1655922626/alt-profile-icons/ghostity-pfp-red_ojqbtt.png",
    "https://res.cloudinary.com/ghostity/image/upload/v1655922626/alt-profile-icons/ghostity-pfp-yellow_xfimay.png",
    "https://res.cloudinary.com/ghostity/image/upload/v1655922626/alt-profile-icons/ghostity-pfp-purple_uhjvu6.png",
    "https://res.cloudinary.com/ghostity/image/upload/v1655922625/alt-profile-icons/ghostity-pfp-periwinkle_tpqwgw.png",
    "https://res.cloudinary.com/ghostity/image/upload/v1655922625/alt-profile-icons/ghostity-pfp-primary_jg3evf.png",
    "https://res.cloudinary.com/ghostity/image/upload/v1655922625/alt-profile-icons/ghostity-pfp-orange_kaueo8.png",
    "https://res.cloudinary.com/ghostity/image/upload/v1655922625/alt-profile-icons/ghostity-pfp-blue_cbnk3u.png",
    "https://res.cloudinary.com/ghostity/image/upload/v1655922625/alt-profile-icons/ghostity-pfp-pink_jrrk3p.png",
    "https://res.cloudinary.com/ghostity/image/upload/v1655922625/alt-profile-icons/ghostity-pfp-mint_j9zuev.png",
  ];

  const [updateProfile] = useUpdateProfile(auth);

  const changePfp = () =>
    updateProfile({ photoURL: currentPfp })
      .then(() => setEditPfp(false))
      .catch(() => {});

  return (
    <ModelWrapper onClick={() => setEditPfp(false)}>
      <motion.div
        initial={{ translateX: "-50%", translateY: "-300%" }}
        animate={{ translateY: "-50%" }}
        exit={{ translateY: "-300%" }}
        className="absolute left-1/2 top-1/2 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-black/50 rounded w-96 p-8">
          <div className="flex flex-col justify-center items-center">
            <Image
              alt="vGhostity profile icon"
              src={currentPfp}
              height={144}
              width={144}
              className="rounded-full text-xs"
            />
            <h1 className="text-xl">Preview</h1>
          </div>
          <div className="mt-4">
            <h2 className="mb-2">Current Options</h2>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(36px,_1fr))] gap-2">
              {profileIconLinks?.map((link) => (
                <PfpCards key={link} src={link} setCurrentPfp={setCurrentPfp} />
              ))}
            </div>
          </div>
          <div className=" mt-2 flex justify-end gap-2 text-gray-500 ">
            <AnimatedButton
              className="bg-gray-200 px-2 rounded"
              onClick={() => setEditPfp(false)}
            >
              Cancel
            </AnimatedButton>
            <AnimatedButton
              onClick={async () => changePfp()}
              className="bg-white text-black px-2 rounded"
            >
              Change
            </AnimatedButton>
          </div>
        </div>
      </motion.div>
    </ModelWrapper>
  );
}
