import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { createContext } from "react";

const UserFollowContext = createContext<DocumentSnapshot<DocumentData> | null | undefined>(null)

export default UserFollowContext