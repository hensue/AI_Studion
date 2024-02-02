// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import UserViewLeft from 'src/views/apps/user/view/UserViewLeft'
import UserViewRight from 'src/views/apps/user/view/UserViewRight'

type Props = {
  tab: string,
  user_id: string,
  invoiceData: InvoiceType[]
}

const UserView = ({ invoiceData, user_id, tab }: Props) => {
  const users = useSelector((state: any) => state.user.data)
  const get_cur_user = (id: string) => {
    
    return users.filter((user:any) => user._id === id)[0]
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft user = { get_cur_user(user_id) }/>
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight tab={tab} invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default UserView
