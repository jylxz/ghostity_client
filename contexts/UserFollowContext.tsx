import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { createContext } from "react";

const UserFollowContext = createContext<{follows: DocumentSnapshot<DocumentData> | undefined, channels: string[] | undefined} | null | undefined>(null)

export default UserFollowContext