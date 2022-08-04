import React, { Fragment,Dispatch, SetStateAction } from 'react'

export default function OrganizationMembersBranchesBar({
  branches,
  currentBranch,
  setCurrentBranch,
}: {
  branches: { name: string; id: number }[];
  currentBranch: number;
  setCurrentBranch: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex flex-wrap justify-center text-sm py-2">
      <button type="button" onClick={() => setCurrentBranch(-1)}>
        {currentBranch === -1 ? (
          <span className="dark:text-text-primary-dark font-semibold px-3">
            All
          </span>
        ) : (
          <span className="dark:text-text-secondary-dark text-gray-400 px-3">
            All
          </span>
        )}
      </button>
      {branches.map((branch) => (
        <Fragment key={branch.id}>
          <div className="before:content-['|'] before:px-1 dark:text-text-secondary-dark text-gray-400" />
          <button
            type="button"
            key={branch.id}
            onClick={() => setCurrentBranch(branch.id)}
            className="flex"
          >
            {currentBranch === branch.id ? (
              <span className="dark:text-text-primary-dark text-black font-semibold px-1">
                {branch.name}
              </span>
            ) : (
              <span className="dark:text-text-secondary-dark text-gray-400 px-1">
                {branch.name}
              </span>
            )}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
