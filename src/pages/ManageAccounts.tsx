import { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import AddBrandDialog from "@/components/dialog/AddBrandDialog";
import { useQuery } from "@tanstack/react-query";
import LoadingSection from "@/components/section/LoadingSection";
import AccountsTable from "@/components/table/AccountsTable";
import { getAccounts } from "@/apis/account";

const ManageAccounts = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const { data, isLoading } = useQuery({
    queryKey: ["get-accounts"],
    queryFn: () => getAccounts(),
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container sx={{ marginTop: "20px" }}>
      <Box display={"flex"} justifyContent={"space-between"} sx={{ marginBottom: "10px" }}>
        <Typography variant="h5" gutterBottom>
          Danh sách tài khoản
        </Typography>
        <Box display={"flex"} gap={2}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Thêm tài khoản
          </Button>
        </Box>
      </Box>

      {isLoading ? (
        <LoadingSection />
      ) : (
        <AccountsTable accounts={data ?? []} page={page} setPage={setPage} />
      )}
      <AddBrandDialog handleClose={handleClose} open={open} />
    </Container>
  );
};

export default ManageAccounts;
