import AnimatedButton from "@general/AnimatedButton";
import TwitterIcon from "@images/TwitterBlue.svg";

export default function OrganizationSocialMedia({
  social,
  isWindowSmall,
}: {
  social: Organization["social_media"][0];
  isWindowSmall?: boolean;
}) {
  if (social.platform === "twitter") {
    return (
      <AnimatedButton
        key={social.url}
        className="text-xs dark:bg-secondary-dark dark:text-text-primary-dark dark:border-0 bg-slate-100 border border-slate-100 px-2 py-1 rounded"
      >
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 font-medium"
        >
          <div className="w-5 h-5 flex">
            <TwitterIcon />
          </div>
          {!isWindowSmall ? social.tag || "Twitter" : null}
        </a>
      </AnimatedButton>
    );
  }

  return null;
}
