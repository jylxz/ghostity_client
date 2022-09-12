import Modal from "@general/Modal";
import ModalWrapper from "@general/ModalWrapper";
import React from "react";
import { useQuery } from "react-query";
import API from "services/api";
import PreviewChannelBanner from "./Banner/PreviewChannelBanner";
import PreviewChannelTwitter from "./Twitter/PreviewChannelTwitter";
import PreviewChannelVideos from "./Videos/PreviewChannelVideos";

export default function PreviewChannel({
  channelId,
  showPreview,
  setShowPreview,
}: {
  channelId: string;
  showPreview: boolean;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const fetchPreviewData = async () =>
    API.get<PreviewData>(`/preview?channelId=${channelId}`).then(
      (res) => res.data
    );

  const preview = useQuery<PreviewData, Error>([channelId], fetchPreviewData);

  if (!showPreview) return null;

  return (
    <Modal
      onClick={() => setShowPreview(false)}
      className="dark:bg-primary-dark dark:text-text-primary-dark bg-white w-3/4 h-3/4 rounded"
    >
        {preview.data && (
          <div className="h-full">
            <PreviewChannelBanner profile={preview.data?.details} setShowPreview={setShowPreview}/>
            <div className="flex max-h-[calc(100%_-_11rem)] dark:bg-secondary-dark bg-secondary-alt">
              <PreviewChannelVideos videos={preview.data?.videos} />
              {preview.data.details.profile.social_media.map((social) => {
                if (social.platform === "twitter") return <PreviewChannelTwitter twitterUrl={social.url}/>
              })}
            </div>
          </div>
        )}
    </Modal>
  );
}
