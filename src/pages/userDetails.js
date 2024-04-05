import * as React from 'react';
import {
  Grid,
  Container,
  CssBaseline,
  Typography,
  Table,
  TableRow,
  TableCell,
  CardContent,
  TableBody,
  TableContainer
} from '@mui/material';
import Card from '@mui/material/Card';
import { useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';

export default function details() {
  const urlid = useParams();
  const userList = useSelector(({ users }) => users.userslist);
  const [userDetails, setUserDetails] = React.useState();
  const userFilter = userList.find((user) => user.id === parseInt(urlid.id));
  React.useEffect(() => {
    setUserDetails(userFilter);
  }, []);
  return (
    <>
      <Container maxWidth={'xl'} sx={{ paddingBottom: '1.25rem', paddingTop: '1.25rem' }}>
        <CssBaseline />
        <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
          <Grid item>
            <Typography variant="h6">User Details</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <br />
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <TableContainer direction="row" justifyContent="space-between" alignItems="baseline">
              <Paper>
                <Table aria-label="simple table" size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2" color="grey">
                          User Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{userDetails?.name}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" color="grey">
                          Email
                        </Typography>
                      </TableCell>
                      <TableCell>{userDetails?.email}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2" color="grey">
                          Role
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{userDetails?.role}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" color="grey">
                          Phone Number
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{userDetails?.phone_number}</Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
