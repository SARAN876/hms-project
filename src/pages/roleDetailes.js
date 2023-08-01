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
  TableContainer,
  Chip
} from '@mui/material';
import Card from '@mui/material/Card';
import { useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';

export default function RoleDetails() {
  const urlid = useParams();
  const usersData = useSelector(({ role }) => role.rolelist);
  const [userDetails, setUserDetails] = React.useState();
  const roleData = usersData.find((role) => role.id === urlid?.id);
  console.log(roleData);
  React.useEffect(() => {
    setUserDetails(roleData);
  }, []);
  return (
    <>
      <Container maxWidth={'xl'} sx={{ paddingBottom: '1.25rem', paddingTop: '1.25rem' }}>
        <CssBaseline />
        <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
          <Grid item>
            <Typography variant="h6">Role Details</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <br />
        <Card sx={{ minWidth: 275, maxWidth: 400 }}>
          <CardContent>
            <TableContainer>
              <Paper>
                <Table aria-label="simple table" size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2" color="grey">
                          Role Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{userDetails?.role}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2" color="grey">
                          Role ID
                        </Typography>
                      </TableCell>
                      <TableCell>{userDetails?.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2" color="grey">
                          Status
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">
                          <Chip
                            label={userDetails?.status === '1' ? 'active' : 'Inactive'}
                            size="small"
                            color={userDetails?.status === '1' ? 'primary' : 'error'}
                          />
                        </Typography>
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
