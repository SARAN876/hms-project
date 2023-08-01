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

export default function deptDetails() {
  const urlid = useParams();
  const departmentData = useSelector(({ department }) => department.departmentlist);
  const [userDetails, setUserDetails] = React.useState();
  const deptData = departmentData.find((dept) => dept.id === urlid?.id);
  React.useEffect(() => {
    setUserDetails(deptData);
  }, []);
  return (
    <>
      <Container maxWidth={'xl'} sx={{ paddingBottom: '1.25rem', paddingTop: '1.25rem' }}>
        <CssBaseline />
        <Grid container direction="row" justifyContent="space-between" alignItems="baseline">
          <Grid item>
            <Typography variant="h6">Department Details</Typography>
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
                          Department Name
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{userDetails?.name}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2" color="grey">
                          Department ID
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
                      <Typography variant="subtitle2">
                        <Chip
                          label={userDetails?.status === '1' ? 'active' : 'Inactive'}
                          size="small"
                          color={userDetails?.status === '1' ? 'primary' : 'error'}
                        />
                      </Typography>
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
