import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useAppDataContext } from '../../shared/contexts/AppDataContext';
import { ChangeEvent, useMemo, useState } from 'react';
import { useStyles } from '../../styles/styles';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function EnhancedTableHead() {
  const headerTableCell = [
    { id: 1, label: 'Id' },
    { id: 2, label: 'Email' },
  ];
  return (
    <TableHead>
      <TableRow>
        {headerTableCell.map(cellData => (
          <TableCell
            align="left"
            sx={{
              borderBottom: '1px solid #D2775D',
              borderTop: '1px solid #D2775D',
            }}
            key={cellData.id}
          >
            {cellData.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar() {
  return (
    <Toolbar
      sx={{ backgroundColor: '#F2796B', borderRadius: '.5rem .5rem 0 0' }}
    >
      <Typography
        sx={{ flex: '1 1 100%', color: '#fff' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Registered users
      </Typography>
    </Toolbar>
  );
}

export default function RegisteredUsersTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const { classes } = useStyles();

  const { registeredUsers } = useAppDataContext();

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const visibleRows = useMemo(
    () =>
      registeredUsers.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [page, registeredUsers, rowsPerPage]
  );

  return (
    <Grid container justifyContent="center">
      <Paper sx={{ borderRadius: '.5rem' }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead />
            <TableBody>
              {visibleRows.map(user => (
                <TableRow key={user.id}>
                  <TableCell className={classes.tableCell}>{user.id}</TableCell>
                  <TableCell className={classes.tableCell}>
                    {user.email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={registeredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Grid container item justifyContent="end" padding={2} gap={1}>
        <Button variant="outlined">Sair</Button>
        <Button variant="contained" onClick={() => navigate('/login')}>
          Voltar
        </Button>
      </Grid>
    </Grid>
  );
}
