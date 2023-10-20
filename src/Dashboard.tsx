import useAuth from "./useAuth";

interface DashboardProps {
  code: string;
}

export default function Dashboard(props: DashboardProps) {
  const { code } = props
  const accessToken = useAuth(code)
  // console.log('Dashboard2')
  return (
    <div>
      {accessToken}
    </div>
  )
}