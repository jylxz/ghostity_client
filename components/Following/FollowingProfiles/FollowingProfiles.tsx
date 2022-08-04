import GradientCircularProgress from '@general/GradientCircularProgress';
import GridWrapper from '@general/GridWrapper';
import ProfileCard from '@general/ProfileCard';
import { motion } from 'framer-motion';
import React, { Fragment, useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import { UseInfiniteQueryResult } from 'react-query';

export default function FollowingProfiles({
  followProfiles,
}: {
  followProfiles: UseInfiniteQueryResult<Profiles, Error>;
}) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && followProfiles.hasNextPage) {
      followProfiles.fetchNextPage().catch(() => {});
    }
  }, [followProfiles, inView]);

  return (
    <>
      <GridWrapper
        colSize="normal"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.5,
            delay: 1.5,
          },
        }}
      >
        {followProfiles.data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.results.map((profile) => (
              <motion.span layout="position" key={profile._id}>
                <ProfileCard key={profile._id} profile={profile} />
              </motion.span>
            ))}
          </Fragment>
        ))}
      </GridWrapper>
      {followProfiles.hasNextPage ? (
        <div
          ref={ref}
          className="flex justify-center items-center pt-10 pb-3 h-24"
        >
          <GradientCircularProgress />
        </div>
      ) : null}
    </>
  );
}
