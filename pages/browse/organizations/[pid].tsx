import { useRouter } from "next/router"

const Organization = () => {
  const router = useRouter()
  const {pid} = router.query
  console.log(router)

  return <>Organization {pid}</>
}

export default Organization